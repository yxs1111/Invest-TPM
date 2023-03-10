import requestApi from '@/api/request-api'
import roleApi from '@/api/system/role-api'
import userApi from '@/api/system/user-api'
import authTenantApi from '@/api/system/auth-tenant-api'
import organizationApi from '@/api/system/organization-api'
import {
  getFormatPickerOptions,
  getTextMap,
  parseTime,
  getDefaultPermissions,
  getHeight
} from '@/utils'
import { Message, MessageBox } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import permission from '@/directive/permission'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { isMobile } from '@/utils/validate'
import GanttElastic from 'gantt-elastic'
import GanttHeader from 'gantt-elastic-header'
import dayjs from 'dayjs'

function getDate(hours) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime()
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime()
}

var tasks = []
const options = {
  taskMapping: {
    progress: 'percent'
  },
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: 'Your project title as html (link or whatever...)',
    html: false
  },
  row: {
    height: 24
  },
  calendar: {
    hour: {
      display: false
    }
  },
  chart: {
    progress: {
      bar: false
    },
    expander: {
      display: true
    }
  },
  taskList: {
    expander: {
      straight: false
    },
    columns: [
      {
        id: 1,
        label: 'ID',
        value: 'id',
        width: 40
      },
      {
        id: 2,
        label: 'Name',
        value: 'label',
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            alert('description clicked!\n' + data.label)
          }
        }
      },
      {
        id: 3,
        label: 'Start',
        value: task => dayjs(task.start).format('YYYY-MM-DD'),
        width: 78
      },
      {
        id: 4,
        label: 'Type',
        value: 'type',
        width: 68
      },
      {
        id: 5,
        label: '%',
        value: 'progress',
        width: 35,
        style: {
          'task-list-header-label': {
            'text-align': 'center',
            width: '100%'
          },
          'task-list-item-value-container': {
            'text-align': 'center',
            width: '100%'
          }
        }
      }
    ]
  },
  locale: {
    name: 'zh', // name String
    weekdays: '??????_??????_??????_??????_??????_??????_??????'.split('_'),
    weekdaysShort: '???_???_???_???_???_???_???'.split('_'),
    weekdaysMin: '???_???_???_???_???_???_???'.split('_'),
    months: '??????_??????_??????_??????_??????_??????_??????_??????_??????_??????_?????????_?????????'.split(
      '_'
    ),
    monthsShort: '1???_2???_3???_4???_5???_6???_7???_8???_9???_10???_11???_12???'.split(
      '_'
    ),
    ordinal: n => `${n}`, // ordinal Function (number) => return number + output
    relativeTime: {
      // relative time format strings, keep %s %d as the same
      future: 'za %s', // e.g. in 2 hours, %s been replaced with 2hours
      past: '%s temu',
      s: 'kilka sekund',
      m: 'minut??',
      mm: '%d minut',
      h: 'godzin??',
      hh: '%d godzin', // e.g. 2 hours, %d been replaced with 2
      d: 'dzie??',
      dd: '%d dni',
      M: 'miesi??c',
      MM: '%d miesi??cy',
      y: 'rok',
      yy: '%d lat'
    }
  }
}

const url = userApi.url

export default {
  name: 'UserInfo',
  components: {
    Treeselect,
    GanttElastic,
    GanttHeader
  },
  directives: { elDragDialog, permission },
  filters: {
    // ??????????????????
    lockedStatusFilter(status) {
      const statusMap = {
        '0': 'success',
        '1': 'danger'
      }
      return statusMap[status]
    },
    // ??????????????????
    lockedWordFilter(locked) {
      const lockedMap = {
        '0': '?????????',
        '1': '?????????'
      }
      return lockedMap[locked]
    },
    // ??????????????????
    expireStatusFilter(expireAt) {
      const now = new Date()
      const expire = new Date(Date.parse(expireAt))
      const result = expire < now ? '1' : '0'
      const statusMap = {
        '0': 'success',
        '1': 'danger'
      }
      return statusMap[result]
    },
    // ??????????????????
    expireWordFilter(expireAt) {
      const now = new Date()
      const expire = new Date(Date.parse(expireAt))
      const result = expire < now ? '1' : '0'
      const lockedMap = {
        '0': '?????????',
        '1': '?????????'
      }
      return lockedMap[result]
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value || !isMobile(value)) {
        callback(new Error('???????????????????????????'))
      } else {
        callback()
      }
    }
    return {
      tasks,
      options: options,
      dynamicStyle: {},
      editDisabled: true,
      multipleSelection: [],
      textMap: getTextMap(),
      rules: {
        name: [{ required: true, message: '?????????????????????', trigger: 'blur' }],
        loginName: [
          { required: true, message: '?????????????????????', trigger: 'blur' }
        ],
        // phone: [{ required: false, trigger: 'blur', validator: validatePhone }],
        phone: [{ required: false, trigger: 'blur'}],
        email: [
          { required: true, message: '?????????????????????', trigger: 'blur' },
          {
            type: 'email',
            message: '??????????????????????????????',
            trigger: ['blur', 'change']
          }
        ],
        orgId: [
          { required: true, message: '????????????????????????', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '???????????????', trigger: 'blur' }]
      },
      lockedStateOptions: [
        { key: 0, display_name: '?????????' },
        { key: 1, display_name: '?????????' }
      ],
      userInfoDialog: {
        state: '',
        visible: false,
        data: {
          id: undefined,
          name: '',
          loginName: '',
          phone: '',
          orgId: null,
          gender: 0,
          locked: 0,
          expireAt: null,
          createBy: null,
          createDate: null
        },
        formLabelWidth: '120px'
      },
      userQuery: {
        name: '',
        locked: null,
        expireState: null,
        dataRange: '',
        startDate: '',
        endDate: '',
        tenantId: null
      },
      userPageProps: {
        records: null,
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      // ????????????????????????
      pickerOptions: getFormatPickerOptions(),
      // ?????????
      centerDialogVisible: false,
      joinOrgDialog: {
        visible: false
      },
      filterTextFs: '',
      filterTextMinePackage: '',
      filterTextKA: '',
      allOrg: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentNodeKey: '',
      currentNodeId: '',
      permissions: getDefaultPermissions(),
      userRoleDialog: {
        visible: false
      },
      transferRoleProps: {
        data: [],
        value: [],
        userId: ''
      },
      // ????????????
      authTenantList: [],
      user_org_map: {},
      maxheight: getHeight(),
      //??????????????????
      roleVisible: false, //????????????????????????
      RoleTreedata: [], //????????????
      RoleTreeFilter: '', //??????????????????
      Role_KA: {
        children: 'children',
        label: 'label'
      },
      treeProps_Mine: {
        children: 'children',
        label: 'label'
      },
      Role_KAData: {}, //KA ????????????
      RoleTreeData_Mine: [], //Mine-package tree data
      RoleTreeData_KA: [], //KA tree data
      RoleTreeData_FieldSales: [], //FieldSales tree data
      roleCode: '',
      roleName: '', //??????????????????--????????????,
      bindId:'',
      bindUserName:'',
    }
  },
  created() {
    this.fetchData()
    // this.getAllOrg()
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.maxheight = getHeight()
      })()
    }
  },
  watch: {
    multipleSelection(val) {
      this.editDisabled = !(val && val.length === 1)
    },
    filterTextFs(val) {
      this.$refs.FileSalesTree.filter(val);
    },
    filterTextMinePackage(val) {
      this.$refs.MinePackageTree.filter(val);
    },
    filterTextKA(val) {
      this.$refs.KATree.filter(val);
    },
  },
  methods: {
    // ????????????
    fetchData() {
      if (this.userQuery.dataRange && this.userQuery.dataRange !== '') {
        this.userQuery.startDate = this.userQuery.dataRange[0]
        this.userQuery.endDate = this.userQuery.dataRange[1]
      } else {
        this.userQuery.startDate = ''
        this.userQuery.endDate = ''
      }
      requestApi
        .getPage(url, {
          name: this.userQuery.name,
          locked: this.userQuery.locked,
          expireState: this.userQuery.expireState,
          startDate: this.userQuery.startDate,
          endDate: this.userQuery.endDate,
          tenantId: this.userQuery.tenantId,
          pageSize: this.userPageProps.pageSize,
          pageNum: this.userPageProps.pageNum
        })
        .then(response => {
          const { data } = response
          this.userPageProps.records = data.records
          this.userPageProps.total = data.total
          this.userPageProps.pageNum = data.pageNum
          this.userPageProps.pageSize = data.pageSize
        })
        .catch(error => {
          console.log(error)
        })
    },
    // ????????????
    saveOrUpdate() {
      this.$refs['userDataForm'].validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.userInfoDialog.data)
          if (this.userInfoDialog.state === 'create') {
            requestApi
              .save(url, params)
              .then(res => {
                if (res && res.code === 1000) {
                  this.userInfoDialog.visible = false
                  Message.success({
                    message: '????????????',
                    duration: 5 * 1000
                  })
                  this.fetchData()
                }
              })
              .catch(() => {})
          } else {
            requestApi
              .update(url, params)
              .then(res => {
                if (res && res.code === 1000) {
                  this.$delete(this.user_org_map, this.userInfoDialog.data.id)
                  if (this.userInfoDialog.data.version) {
                    this.userInfoDialog.data.version++
                  }
                  const index = this.userPageProps.records.findIndex(
                    v => v.id === this.userInfoDialog.data.id
                  )
                  this.userPageProps.records.splice(
                    index,
                    1,
                    this.userInfoDialog.data
                  )
                  this.userInfoDialog.visible = false
                  Message.success({
                    message: '????????????',
                    duration: 5 * 1000
                  })
                }
              })
              .catch(() => {})
          }
        }
      })
    },
    // ?????????????????????
    showDeleteDialog() {
      this.centerDialogVisible = true
    },
    // ????????????
    handleDeleteRows() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.centerDialogVisible = false
        const ids = []
        this.multipleSelection.map(row => {
          ids.push(row.id)
        })
        requestApi.remove(url, ids).then(res => {
          if (res && res.code === 1000) {
            Message.success({
              message: '????????????',
              duration: 5 * 1000
            })
            this.fetchData()
          }
        })
      }
    },
    // ????????????
    handleDelete(row) {
      this.$refs['userInfoTable'].clearSelection()
      this.$refs['userInfoTable'].toggleRowSelection(row)
      this.centerDialogVisible = true
    },
    // ???????????????????????????
    handleSizeChange(size) {
      this.userPageProps.pageSize = size
      this.fetchData()
    },
    // ???????????????
    handleCurrentChange(num) {
      this.userPageProps.pageNum = num
      this.fetchData()
    },
    // ??????????????????
    search() {
      this.handleCurrentChange(1)
    },
    // ????????????
    reset() {
      this.$refs['userInfoForm'].resetFields()
      this.userQuery.dataRange = ''
      this.userPageProps.records = null
      this.userPageProps.total = 0
      this.userPageProps.pageSize = 10
      this.userPageProps.pageNum = 1
      this.fetchData()
    },
    // ??????????????????????????????
    handleCurrentRowClick(row, column) {
      if (
        column.label !== '??????' &&
        column.label !== '?????????' &&
        column.label !== '?????????'
      ) {
        this.$refs['userInfoTable'].toggleRowSelection(row)
      }
    },
    // ????????????????????????
    handleCurrentRowDblClick(row, column) {
      if (column.label !== '?????????' && column.label !== '?????????') {
        this.$refs['userInfoTable'].clearSelection()
        this.$refs['userInfoTable'].toggleRowSelection(row)
        this.getRowData(row)
      }
    },
    // ?????????????????????
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // ???????????????
    parseJson(time, cFormat) {
      if (time == null) {
        return ''
      }
      return parseTime(time, cFormat)
    },
    // ?????????
    tableRowClassName({ row }) {
      if (row.locked === 1) {
        return 'warning-row'
      } else if (row.locked === 3) {
        return 'success-row'
      }
      return ''
    },
    // ?????????????????????
    getRowData(row) {
      this.resetUserInfoDialog()
      this.userInfoDialog.visible = true
      this.userInfoDialog.data = Object.assign({}, row)
      this.getOrgByUser(this.userInfoDialog.data.id)
      this.userInfoDialog.state = 'info'
    },
    // ??????
    editRowData(row) {
      this.resetUserInfoDialog()
      this.userInfoDialog.visible = true
      this.userInfoDialog.data = Object.assign({}, row)
      this.getOrgByUser(this.userInfoDialog.data.id)
      this.changeToEdit()
    },
    // ??????
    newRowData() {
      this.resetUserInfoDialog()
      this.userInfoDialog.data.gender = 0
      this.userInfoDialog.data.locked = 0
      this.userInfoDialog.visible = true
      this.userInfoDialog.state = 'create'
    },
    // ?????????????????????
    changeToEdit() {
      this.userInfoDialog.state = 'update'
    },
    // ??????????????????
    resetUserInfoDialog() {
      this.$nextTick(() => {
        if (this.$refs['userDataForm']) {
          this.$refs['userDataForm'].clearValidate()
        }
      })
      this.userInfoDialog.data = {
        id: undefined,
        name: '',
        loginName: '',
        code: '',
        phone: '',
        orgId: null,
        gender: 0,
        locked: 0,
        createBy: null,
        createDate: null
      }
    },
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      if (this.$refs.select) {
        this.$refs.select.blur()
      }
    },
    // ??????????????????
    // getAllOrg() {
    //   organizationApi.getAll().then(response => {
    //     if (response.data) {
    //       this.allOrg.push(response.data)
    //     }
    //   })
    // },
    // ??????????????????
    normalizer(node) {
      if (!node.children || node.children.length < 1) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    // ???????????????
    onInputChange(node) {
      this.$nextTick(() => {
        this.$refs['userDataForm'].validateField('orgId')
      })
    },
    getOrgByUser(userId) {
      let orgId = this.user_org_map[userId]
      if (orgId) {
        this.userInfoDialog.data.orgId = orgId
      } else {
        userApi.getUserOrg({ userId: userId }).then(res => {
          if (res && res.code === 1000) {
            if (res.data && res.data.length > 0) {
              orgId = res.data[0]
              this.$set(this.userInfoDialog.data, 'orgId', orgId)
              this.$set(this.user_org_map, userId, orgId)
            }
          }
        })
      }
    },
    // ??????
    editUserRole() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.transferRoleProps.userId = this.multipleSelection[0].id
        this.userRoleDialog.visible = true
        userApi
          .getRolePage({ pageSize: 100, pageNum: 1 })
          .then(res => {
            if (res.data) {
              this.transferRoleProps.data = res.data.records
              userApi
                .listBindRoles({ userId: this.transferRoleProps.userId })
                .then(role => {
                  if (role.data) {
                    this.transferRoleProps.value = role.data
                  }
                })
            }
          })
          .catch(error => console.log(error))
      }
    },
    // ??????????????????
    saveRoles() {
      this.userRoleDialog.visible = false
      userApi
        .bindRole({
          userId: this.transferRoleProps.userId,
          roleCodes: this.transferRoleProps.value
        })
        .then(res => {
          if (res && res.code === 1000) {
            Message.success({
              message: '????????????',
              duration: 5 * 1000
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllTenant() {
      authTenantApi
        .getAllTenant()
        .then(res => {
          if (res && res.code === 1000) {
            this.authTenantList = res.data
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // ????????????
    resetPw(row) {
      this.$refs['userInfoTable'].clearSelection()
      this.$refs['userInfoTable'].toggleRowSelection(row)
      const id = row.id
      MessageBox.confirm('??????????????????????', '????????????', {
        confirmButtonText: '??????',
        cancelButtonText: '??????',
        type: 'warning'
      }).then(() => {
        requestApi
          .request_post(userApi.url + '/resetPassword', { id: id })
          .then(res => {
            if (res && res.code === 1000) {
              Message.success({
                message: '????????????',
                duration: 5 * 1000
              })
            }
          })
      })
    },
    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: 'project'
      })
    },
    tasksUpdate(tasks) {
      this.tasks = tasks
    },
    optionsUpdate(options) {
      this.options = options
    },
    styleUpdate(style) {
      this.dynamicStyle = style
    },
    // ?????????
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return 'even-row'
      } else {
        return 'odd-row'
      }
    },
    HeadTable() {
      return ' background: #fff;color: #333;font-size: 16px;text-align: center;font-weight: 400;font-family: Source Han Sans CN;'
    },
    //??????????????????--????????????
    async bindDataRow(obj) {
      this.roleVisible = true
     await this.getKAList()
     await this.getMinePackage()
     await this.getFieldSales()
     await this.getDefaultRolePermissions(obj.loginName)
      this.bindId=obj.id
      this.bindUserName=obj.loginName
    },
    //??????????????????--??????
    confirmRoleDialog() {
      let ContractItemList = this.$refs.MinePackageTree.getCheckedNodes()
      let FileSalesList = this.$refs.FileSalesTree.getCheckedNodes()
      let KAlist = this.$refs.KATree.getCheckedNodes()
      console.log(ContractItemList);
      console.log(FileSalesList);
      console.log(KAlist);
      let obj = {
        id:this.bindId,
        userName:this.bindUserName,
        kaDataList: [],
        ciDataList: [],
        fsDatalist: []
      }
      ContractItemList.forEach(item => {
        obj.ciDataList.push({
          ciDataFirCode: item.dataFirCode,
          ciDataSecCode: item.dataSecCode,
          ciDataTerCode: item.dataTerCode
        })
      })
      FileSalesList.forEach(item => {
        obj.fsDatalist.push({
          fsDataFirCode: item.dataFirCode,
          fsDataFirId: item.dataFirId,
          fsDataSecId: item.dataSecId,
          fsDataSecCode: item.dataSecCode,
          fsDataTerId: item.dataTerId,
          fsDataTerCode: item.dataTerCode,
          fsDataFouId: item.dataFouId,
          fsDataFouCode: item.dataFouCode,
        })
      })
      KAlist.forEach(item => {
        obj.kaDataList.push({
          kaDataFirCode: item.dataFirCode,
          kaDataSecId: item.dataSecId,
          kaDataSecCode: item.dataSecCode,
          kaDataTerId: item.dataTerId,
          kaDataTerCode: item.dataTerCode
        })
      })
      console.log(obj)
      roleApi.bindDataPermissions(obj).then(res => {
        this.closeRoleDialog()
        this.$message.success('??????????????????')
      })
    },
    //??????????????????--??????
    closeRoleDialog() {
      this.roleVisible = false
      this.roleCode = ''
      this.RoleTreeData_KA = []
      this.RoleTreeData_Mine = []
      this.RoleTreeData_FieldSales = []
      this.filterTextFs=''
      this.filterTextMinePackage=''
      this.filterTextKA=''
    },
    //??????????????????
    async getDefaultRolePermissions(userName) {
      await roleApi.getDefaultRolePermissions({ userName }).then(res => {
        let {ciDataList,fsDatalist,kaDataList}=res.data
        ciDataList.forEach(item=>{
          item.dataFirCode= 'Cost Item'
          item.dataSecCode= item.ciDataSecCode
          item.dataTerCode= item.ciDataTerCode
          item.label= item.ciDataTerCode
          //??????null??????????????????????????????????????????
          if(item.ciDataSecCode!=null&&item.ciDataTerCode!=null) {
            item.mid=item.ciDataSecCode + '-' + item.ciDataTerCode
          }
        })
        this.$refs.MinePackageTree.setCheckedNodes([...ciDataList])
        let fsNodeKeyList=[]
        fsDatalist.forEach(item=>{
          //??????null??????????????????????????????????????????
          if(item.fsDataFirId!=null&&item.fsDataSecId!=null&&item.fsDataTerId!=null&&item.fsDataFouId!=null) {
            fsNodeKeyList.push(item.fsDataFirId+'-'+item.fsDataSecId+'-'+item.fsDataTerId+'-'+item.fsDataFouId)
          }
          // NodeKey:"FieldSales-zone-4539"
        })
        // console.log(fsNodeKeyList);
        this.$refs.FileSalesTree.setCheckedKeys([...fsNodeKeyList])
        let NoeKeyList=[]
        kaDataList.forEach(item=>{
          //??????null??????????????????????????????????????????
          if(item.kaDataSecCode!=null&&item.kaDataTerCode!=null) {
            item.NodeKey= 'KA-' +item.kaDataSecCode+'-'+item.kaDataTerCode
            NoeKeyList.push(item.NodeKey)
          }
          //NodeKey:"KA-LKA-1003"
        })
        // console.log(NoeKeyList);
        this.$refs.KATree.setCheckedKeys([...NoeKeyList])
      })
    },
    //??????KA ??????  NodeKey: "KA-EC-007"
    async getKAList() {
     await roleApi.getKAList().then(res => {
        let list = res.data.channelList
        for (let i = 0; i < list.length; i++) {
          list[i]['label'] = list[i].channelCode
          list[i]['children'] = list[i].customerList
          list[i]['dataFirCode'] = res.data.ka
          list[i]['dataSecCode'] = list[i].channelCode
          list[i]['dataSecId'] = list[i].id
          list[i]['NodeKey'] = list[i]['dataFirCode']+'-'+list[i].channelCode
          if (list[i].customerList) {

            for (let j = 0; j < list[i].children.length; j++) {
              list[i].children[j]['dataFirCode'] = res.data.ka
              list[i].children[j]['label'] = list[i].children[j].customerCsName
              list[i].children[j]['dataTerId'] = list[i].children[j].id
              list[i].children[j]['dataTerCode'] =
                list[i].children[j].customerCode
              list[i].children[j]['dataSecId'] = list[i].id
              list[i].children[j]['dataSecCode'] = list[i].channelCode
              list[i].children[j]['NodeKey'] =
                list[i].children[j]['dataFirCode'] +
                '-' +
                list[i].children[j]['dataSecCode'] +
                '-' +
                list[i].children[j]['dataTerCode']
            }
          } else {
            list[i]['children'] = []
          }
        }
        var obj = {
          label: 'KA',
          children: [...list]
        }
        this.RoleTreeData_KA.push(obj)
      })
    },
    //??????Mine Package ??????
    async getMinePackage() {
      await roleApi.getMinePackage().then(res => {
        let list = []
        let secondObj = res.data
        console.log(secondObj, 'ddddd')
        for (const key in secondObj) {
          let obj = {
            children: [],
            label: key,
            dataFirCode: 'Mine Package',
            dataSecCode: key,
          }
          const thirdList = secondObj[key]
          thirdList.forEach(thirdItem => {
            obj.children.push({
              dataFirCode: 'Mine Package',
              dataSecCode: key,
              dataTerCode: thirdItem,
              label: thirdItem,
              mid: key + '-' + thirdItem
            })
          })
          list.push({
            ...obj
          })
        }
        var obj = {
          label: 'Mine Package',
          children: [...list]
        }
        this.RoleTreeData_Mine = []
        this.RoleTreeData_Mine.push(obj)
      })
    },
    //??????Field sales ??????  NodeKey: "FieldSales-zone-4678"
    async getFieldSales() {
     await roleApi.getFieldSales().then(res => {
        let list = res.data.children
        //?????? ??????
        for (let i = 0; i < list.length; i++) {
          list[i]['label'] = list[i].name
          list[i]['dataFirCode'] = list[i].nameAbridge
          list[i]['dataFirId'] = list[i].id
          list[i]['NodeKey'] = list[i]['dataFirId']
          if (list[i].children) {
            //?????? ??????
            for (let s = 0; s < list[i].children.length; s++) {
              list[i].children[s]['label'] = list[i].children[s].name
              list[i].children[s]['dataFirCode'] = list[i].nameAbridge
              list[i].children[s]['dataFirId'] = list[i].id
              list[i].children[s]['dataSecCode'] = list[i].children[s].nameAbridge
              list[i].children[s]['dataSecId'] = list[i].children[s].id
              list[i].children[s]['NodeKey'] = list[i]['dataFirId']+'-'+list[i].children[s]['dataSecId']
              if(list[i].children[s].children) {
                //????????????
                for (let t = 0; t < list[i].children[s].children.length; t++) {
                  list[i].children[s].children[t]['label'] = list[i].children[s].children[t].name
                  list[i].children[s].children[t]['dataFirCode'] = list[i].nameAbridge
                  list[i].children[s].children[t]['dataFirId'] = list[i].id
                  list[i].children[s].children[t]['dataSecCode'] = list[i].children[s].nameAbridge
                  list[i].children[s].children[t]['dataSecId'] = list[i].children[s].id
                  list[i].children[s].children[t]['dataTerCode'] = list[i].children[s].children[t].nameAbridge
                  list[i].children[s].children[t]['dataTerId'] = list[i].children[s].children[t].id
                  list[i].children[s].children[t]['NodeKey'] = list[i]['dataFirId']+'-'+list[i].children[s]['dataSecId']+'-'+list[i].children[s].children[t]['dataTerId']
                  //???????????????
                  if(list[i].children[s].children[t].children) {
                    for (let f = 0; f < list[i].children[s].children[t].children.length; f++) {
                      list[i].children[s].children[t].children[f]['label'] = list[i].children[s].children[t].children[f].name
                      list[i].children[s].children[t].children[f]['dataFirCode'] = list[i].nameAbridge
                      list[i].children[s].children[t].children[f]['dataFirId'] = list[i].id
                      list[i].children[s].children[t].children[f]['dataSecCode'] = list[i].children[s].nameAbridge
                      list[i].children[s].children[t].children[f]['dataSecId'] = list[i].children[s].id
                      list[i].children[s].children[t].children[f]['dataTerCode'] = list[i].children[s].children[t].nameAbridge
                      list[i].children[s].children[t].children[f]['dataTerId'] = list[i].children[s].children[t].id
                      list[i].children[s].children[t].children[f]['dataFouCode'] = list[i].children[s].children[t].children[f].nameAbridge
                      list[i].children[s].children[t].children[f]['dataFouId'] = list[i].children[s].children[t].children[f].id
                      list[i].children[s].children[t].children[f]['NodeKey'] = list[i]['dataFirId']+'-'+list[i].children[s]['dataSecId']+'-'+list[i].children[s].children[t]['dataTerId']+'-'+list[i].children[s].children[t].children[f]['dataFouId']
                    }
                  }
                }
              }
            }
            // for (let j = 0; j < list[i].children.length; j++) {
            //   list[i].children[j]['label'] = list[i].children[j].name
            //   list[i].children[j]['dataTerId'] = list[i].children[j].id
            //   list[i].children[j]['dataTerCode'] = list[i].children[j].nameAbridge
            //   list[i].children[j]['dataSecId'] = list[i].id
            //   list[i].children[j]['dataSecCode'] = list[i].name
            //   list[i].children[j]['dataFirCode'] = 'FieldSales'
            //   list[i].children[j]['NodeKey'] =
            //     'FieldSales-' +
            //     list[i].children[j]['dataSecCode'] +
            //     '-' +
            //     list[i].children[j]['dataTerCode']
            // }
          } else {
            list[i]['children'] = []
          }
        }
        var obj = {
          label: 'Zone',
          children: [...list]
        }
        this.RoleTreeData_FieldSales.push(obj)
      })
    },
    //??????
    RoleTreeFilterMethod(value, data, node) {
      return this.getHasKeyword(value, node)
    },
    //??????????????????????????????
    getHasKeyword(value, node) {
      if (node.data instanceof Array) {
        node.data = node.data.length > 0 ? node.data[0] : {}
      }
      if (node.data.label && node.data.label.indexOf(value) !== -1) {
        return true
      } else {
        return node.parent && this.getHasKeyword(value, node.parent)
      }
    }
  }
}

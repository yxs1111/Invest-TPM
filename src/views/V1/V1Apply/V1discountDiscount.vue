<template>
  <div class="MainContent">
    <!-- 查询条件 -->
    <div class="SelectBarWrap">
      <div class="SelectBar">
        <div class="Selectli">
          <span class="SelectliTitle">活动月:</span>
          <el-select v-model="localDate" filterable clearable placeholder="请选择">
            <el-option v-for="item in monthList" :key="item.id" :label="item.activityMonth" :value="item.activityMonth" />
          </el-select>
        </div>
        <div class="Selectli" @keyup.enter="search">
          <span class="SelectliTitle">渠道:</span>
          <el-select v-model="filterObj.channelCode" clearable filterable placeholder="请选择" @change="getCustomerList">
            <el-option v-for="(item) in channelArr" :key="item.channelCode" :label="item.channelEsName" :value="item.channelEsName" />
          </el-select>
        </div>
        <div class="Selectli">
          <span class="SelectliTitle">客户:</span>
          <!-- <el-date-picker v-model="filterObj.custom" type="month" placeholder="请选择" /> -->
          <el-select v-model="filterObj.customerIndex" clearable filterable placeholder="请选择">
            <el-option v-for="(item, index) in customerArr" :key="item.customerCode + index" :label="item.customerCsName" :value="index" />
          </el-select>
        </div>
        <div class="Selectli">
          <span class="SelectliTitle">经销商:</span>
          <el-select v-model="filterObj.distributorCode" clearable filterable placeholder="请选择">
             <el-option v-for="(item, index) in distributorArr" :key="index" :label="item.distributorName" :value="item.distributorName"  />
          </el-select>
        </div>
        <div class="Selectli">
          <span class="SelectliTitle">区域:</span>
          <el-select v-model="filterObj.regionName" clearable filterable placeholder="请选择">
            <el-option v-for="(item, index) in RegionList" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </div>
        <div class="Selectli">
          <span class="SelectliTitle">SKU:</span>
          <el-select v-model="filterObj.productCode" clearable filterable placeholder="请选择">
            <el-option v-for="(item, index) in skuArr" :key="item.productCode+index" :label="item.productEsName" :value="item.productEsName" />
          </el-select>
        </div>
      </div>
      <div class="OpertionBar">
        <el-button type="primary" class="TpmButtonBG" @click="getTableData">查询</el-button>
        <div class="TpmButtonBG" @click="exportExcelInfo">
          <img src="../../../assets/images/export.png" alt="">
          <span class="text">导出</span>
        </div>
      </div>
    </div>
    <div class="TpmButtonBGWrap">
      <div class="TpmButtonBG" :class="btnStatus?'':'noClick'" @click="importData(0)">
        <img src="../../../assets/images/import.png" alt="">
        <span class="text">导入</span>
      </div>
      <div class="TpmButtonBG" :class="btnStatus?'':'noClick'" @click="importData(1)">
        <img src="../../../assets/images/import.png" alt="">
        <span class="text">爱亲/爱婴岛导入</span>
      </div>
      <el-button type="primary" class="TpmButtonBG" :class="submitBtn === 1?'noClick':''" @click="Calculation">计算</el-button>
      <div class="TpmButtonBG" :class="btnStatus&&isCalculation === 1?'':'noClick'" @click="submitInfo">
        <svg-icon icon-class="passLocal" style="font-size: 22px;" />
        <span class="text">提交</span>
      </div>
    </div>
    <el-table :data="tableData" border :max-height="maxheight" :header-cell-style="HeadTable" :row-class-name="tableRowClassName" style="width: 100%">
      <el-table-column width="420" align="center" prop="cpId" label="CPID" fixed />
      <el-table-column width="120" align="center" prop="yearAndMonth" label="活动月" />
      <el-table-column width="120" align="center" prop="costTypeName" label="费用类型" />
      <el-table-column width="150" align="center" prop="minePackageName" label="Mine Package" />
      <el-table-column width="260" align="center" prop="costItemName" label="费用科目" />
      <el-table-column width="120" align="center" prop="channelName" label="渠道" />
      <el-table-column width="120" align="center" prop="customerName" label="客户系统名称" />
      <el-table-column width="120" align="center" prop="brandName" label="品牌" />
      <el-table-column width="160" align="center" prop="productName" label="SKU" />
      <el-table-column width="160" align="center" prop="activityLevel" label="活动级别" />
      <el-table-column width="190" align="center" prop="priceGearAmount" label="价格档位（RMB/Tin）">
        <template slot-scope="scope">
          <div class="priceLevelWrap">
            <div class="priceLevel" :class="scope.$index%3===0?'':scope.$index%3===1?'priceCenter':'priceLow'">{{ FormateNum(scope.row.priceGearAmount) }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220" align="center" prop="totalPriceGearVol" label="价格档位销量总计（CTN）">
        <template slot-scope="scope">
          <div class="priceLevelWrap">
            <div class="TotalNum">{{ FormateNum(scope.row.totalPriceGearVol) }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="400" align="center" prop="distributorName" label="经销商" />
      <el-table-column width="120" align="center" prop="regionName" label="区域" />
      <el-table-column v-slot="{row}" width="220" align="right" prop="systemRecommendedVol" label="系统拆分销量（CTN）">
        {{ FormateNum(row.systemRecommendedVol) }}
      </el-table-column>
      <el-table-column v-slot="{row}" width="220" align="right" prop="adjustedVol" label="调整后销量（CTN）">
        {{ FormateNum(row.adjustedVol) }}
      </el-table-column>
      <el-table-column width="220" align="right" prop="volDifference" label="销量差值（%）" />
      <!-- <template slot-scope="scope">{{ scope.row.volDifference + '%' }}</template>
      </el-table-column> -->
      <el-table-column v-slot="{row}" width="220" align="right" prop="adjustedAmount" label="调整后费用（RMB）">
        {{ FormateNum(row.adjustedAmount) }}
      </el-table-column>
      <el-table-column v-slot="{row}" width="220" align="right" prop="distNoticeCost" label="经销商通知函费用（RMB）">
        {{ FormateNum(row.distNoticeCost) }}
      </el-table-column>
      <el-table-column width="120" align="center" prop="mechanismType" label="机制类型" />
      <el-table-column width="120" align="center" prop="mechanismName" label="机制名称" />
      <el-table-column width="120" align="center" prop="activityTheme" label="活动主题窗口" />
      <el-table-column v-slot="{row}" width="180" align="center" prop="activityDateStart" label="活动开始时间">
        {{ row.activityDateStart ? row.activityDateStart.substring(0, 10) : '' }}
      </el-table-column>
      <el-table-column v-slot="{row}" width="180" align="center" prop="activityDateEnd" label="活动结束时间">
        {{ row.activityDateEnd ? row.activityDateEnd.substring(0, 10) : '' }}
      </el-table-column>
      <el-table-column width="150" align="center" prop="judgmentType" label="系统判定">
        <template slot-scope="{row}">
          <div v-if="row.judgmentType!== null" class="statusWrap">
            <img v-if="row.judgmentType === 'Pass'" src="../../../assets/images/success.png" alt="">
            <img v-if="row.judgmentType.indexOf('Exception') > -1" src="../../../assets/images/warning.png" alt="">
            {{ row.judgmentType }}
          </div>
          <div v-else>{{ row.judgmentType }}</div>
        </template>
      </el-table-column>
      <el-table-column width="800" align="center" prop="judgmentContent" label="审批判定内容" />
      <el-table-column width="120" align="center" prop="applyRemarks" label="申请人备注" />
      <el-table-column width="220" align="center" prop="poApprovalComments" label="Package Owner审批意见" />
      <el-table-column width="220" align="center" prop="finApprovalComments" label="Finance审批意见" />
    </el-table>
    <!-- 分页 -->
    <div class="TpmPaginationWrap">
      <el-pagination :current-page="pageNum" :page-sizes="[5, 10, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 导入 -->
    <el-dialog width="66%" class="my-el-dialog" title="导入" :visible="importVisible" @close="closeimportDialog">
      <div class="el-downloadFileBar" style="display:flex;">
        <div>
          <el-button type="primary" plain class="my-export" icon="el-icon-my-down" @click="downLoadElxModel">下载模板
          </el-button>
          <el-button v-if="firstIsPass" type="primary" plain class="my-export" icon="el-icon-my-checkData" @click="confirmImport()">检测数据
          </el-button>
        </div>
        <el-button v-if="saveBtn" type="primary" class="TpmButtonBG" @click="saveImportInfo">保存</el-button>
      </div>

      <div class="fileInfo" style="justify-content: space-between;">
        <div style="display: flex;">
          <div class="fileTitle" style="width:35px;line-height:40px;">文件</div>
          <el-button size="mini" class="my-search selectFile" icon="el-icon-my-file" @click="parsingExcelBtn">选择文件</el-button>
          <input id="fileElem" ref="filElem" type="file" style="display: none" @change="parsingExcel($event)">
          <div v-if="uploadFileName!=''" class="fileName">
            <img src="@/assets/upview_fileicon.png" alt="" class="upview_fileicon">
            <span>{{ uploadFileName }}</span>
          </div>
        </div>
        <div class="seeData" style="width: auto;">
          <div class="exportError" @click="exportErrorList">
            <img src="@/assets/exportError_icon.png" alt="" class="exportError_icon">
            <span>导出错误信息</span>
          </div>
        </div>
      </div>

      <div class="tableWrap">
        <vxe-table ref="sampleTable" border fit height="400" :data="checkedData" style="width: 100%" :header-cell-style="{
            background: '#fff',
            color: '#333',
            fontSize: '16px',
            textAlign: 'center',
            fontWeight: 400,
            fontFamily: 'Source Han Sans CN'
          }" :row-class-name="tableRowClassName" stripe>
          <vxe-table-column prop="date" fixed="left" align="center" title="是否通过" width="100">
            <template slot-scope="scope">
              <img v-if="scope.row.judgmentType == 'Error'" :src="errorImg">
              <img v-else-if="scope.row.judgmentType===null? false:(scope.row.judgmentType.indexOf('Exception') > -1)" :src="excepImg" style="width:25px;height:25px;">
              <img v-else-if="scope.row.judgmentType == 'Pass'" :src="passImg" style="width:25px;height:25px;">
              <img v-else-if="scope.row.judgmentType===null" :src="passImg" style="width:25px;height:25px;">
              <img v-else :src="errorImg" style="width:25px;height:25px;">
            </template>
          </vxe-table-column>
          <vxe-table-column width="400" align="center" field="judgmentContent" title="验证信息" />
          <vxe-table-column width="420" align="center" field="cpId" title="CPID" />
          <vxe-table-column width="120" align="center" field="yearAndMonth" title="活动月" />
          <vxe-table-column width="120" align="center" field="costTypeName" title="费用类型" />
          <vxe-table-column width="150" align="center" field="minePackageName" title="Mine Package" />
          <vxe-table-column width="260" align="center" field="costItemName" title="费用科目" />
          <vxe-table-column width="120" align="center" field="channelName" title="渠道" />
          <vxe-table-column width="120" align="center" field="customerName" title="客户系统名称" />
          <vxe-table-column width="120" align="center" field="brandName" title="品牌" />
          <vxe-table-column width="160" align="center" field="productName" title="SKU" />
          <vxe-table-column width="190" align="center" field="priceGearAmount" title="价格档位（RMB/Tin）">
            <template slot-scope="scope">
              <div class="priceLevelWrap">
                <div class="priceLevel" :class="scope.$index%3===0?'':scope.$index%3===1?'priceCenter':'priceLow'">{{ FormateNum(scope.row.priceGearAmount) }}</div>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column width="220" align="center" prop="totalPriceGearVol" title="价格档位销量总计（CTN）">
            <template slot-scope="scope">
              <div class="priceLevelWrap">
                <div class="TotalNum">{{ FormateNum(scope.row.totalPriceGearVol) }}</div>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column width="400" align="center" field="distributorName" title="经销商" />
          <vxe-table-column width="120" align="center" field="regionName" title="区域" />
          <vxe-table-column width="220" align="right" field="systemRecommendedVol" title="系统拆分销量（CTN）">
            <template slot-scope="scope"> {{ FormateNum(scope.row.systemRecommendedVol) }}</template>
          </vxe-table-column>
          <vxe-table-column width="220" align="right" field="adjustedVol" title="调整后销量（CTN）">
            <template slot-scope="scope"> {{ FormateNum(scope.row.adjustedVol) }}</template>
          </vxe-table-column>
          <vxe-table-column width="220" align="right" field="volDifference" title="销量差值（%）">
            <template slot-scope="scope">{{ scope.row.volDifference }}</template>
          </vxe-table-column>
          <vxe-table-column width="220" align="right" field="adjustedAmount" title="调整后费用（RMB）">
            <template slot-scope="scope"> {{ FormateNum(scope.row.adjustedAmount) }}</template>
          </vxe-table-column>
          <vxe-table-column width="220" align="right" field="distNoticeCost" title="经销商通知函费用（RMB）">
            <template slot-scope="scope"> {{ FormateNum(scope.row.distNoticeCost) }}</template>
          </vxe-table-column>
          <vxe-table-column width="120" align="center" field="mechanismType" title="机制类型" />
          <vxe-table-column width="120" align="center" field="mechanismName" title="机制名称" />
          <vxe-table-column width="120" align="center" field="activityTheme" title="活动主题窗口" />
          <vxe-table-column width="120" align="center" field="activityDateStart" title="活动开始时间" />
          <vxe-table-column width="120" align="center" field="activityDateEnd" title="活动结束时间" />
          <vxe-table-column width="120" align="center" field="judgmentType" title="系统判定" />
          <vxe-table-column width="120" align="center" field="applyRemarks" title="申请人备注" />
          <vxe-table-column width="220" align="center" field="poApprovalComments" title="Package Owner审批意见" />
          <vxe-table-column width="220" align="center" field="finApprovalComments" title="Finance审批意见" />
        </vxe-table>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import permission from '@/directive/permission'
import elDragDialog from '@/directive/el-drag-dialog'
import {
  getDefaultPermissions,
  messageMap,
  formatThousandNum,
  getHeightHaveTab,
  messageObj,
} from '@/utils'
import API from '@/api/V1/v1.js'
import selectAPI from '@/api/selectCommon/selectCommon.js'

export default {
  name: 'V1discountDiscount',
  directives: { elDragDialog, permission },

  data() {
    return {
      errorImg: require('@/assets/images/selectError.png'),
      excepImg: require('@/assets/images/warning.png'),
      passImg: require('@/assets/images/success.png'),
      fileList: [],
      file: undefined,
      pic: {},
      // 导入
      uploadFile: '',
      event: '',
      ImportData: [],
      uploadFileName: '',
      importVisible: false, // 导入弹窗
      filterImportData: { sku: '' }, // 筛选导入数据
      total: 0,
      pageSize: 100,
      pageNum: 1,
      filterObj: {
        customerMdmCode: '',
        customerIndex: '',
        customerCode: '',
        channelCode: '',
        distributorCode: '',
        productCode: '',
        regionName: '',
      },
      monthList: [],
      RegionList: [],
      categoryArr: [],
      permissions: getDefaultPermissions(),
      tableData: [],
      dialogVisible: false,
      mainIdLocal: null,
      checkedData: [],
      saveBtn: false,
      channelArr: [],
      skuArr: [],
      customerArr: [],
      distributorArr: [],
      submitBtn: 1,
      localDate: '',
      btnStatus: false,
      usernameLocal: '',
      firstIsPass: false,
      isCalculation: false,
      maxheight: getHeightHaveTab(),
      isAiQin:0, //是否是爱亲/爱婴岛 导入
    }
  },
  computed: {},
  watch: {
    'filterObj.customerIndex'(value) {
      if (value === '') {
        this.filterObj.customerCode = ''
        this.filterObj.customerMdmCode = ''
      } else {
        this.filterObj.customerCode =
          this.customerArr[this.filterObj.customerIndex].customerCsName
        this.filterObj.customerMdmCode =
          this.customerArr[this.filterObj.customerIndex].customerMdmCode
      }
      this.filterObj.distributorCode = ''
      this.getDistributorList()
    },
    // 'filterObj.customerCode'() {
    //   this.filterObj.distributorCode = ''
    //   this.getDistributorList()
    // },
    'filterObj.distributorCode'() {
      this.filterObj.regionName = ''
      this.getRegionList()
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.maxheight = getHeightHaveTab()
      })()
    }
    this.usernameLocal = localStorage.getItem('usernameLocal')
    this.getChannel()
    this.getAllMonth()
    this.getSKU()
    this.getRegionList()
    // this.getCustomerList()
    this.getDistributorList()
  },
  methods: {
    // 格式化--千位分隔符、两位小数
    FormateNum(num) {
      return formatThousandNum(num)
    },
    getAllMonth() {
      selectAPI.getAllMonth().then((res) => {
        this.monthList = res.data
      })
    },
    // 获取下拉框
    getChannel() {
      selectAPI.queryChannelSelect().then((res) => {
        if (res.code === 1000) {
          this.channelArr = res.data
          // if (!this.$route.query.channelCode) {
          //   this.filterObj.channelCode = this.channelArr[0].channelEsName
          // } else {
          //   this.filterObj.channelCode = this.$route.query.channelCode
          // }
          this.getCustomerList(this.filterObj.channelCode)
        }
      })
    },
    getRegionList() {
      selectAPI
        .getRegionList({
          distributorName: this.filterObj.distributorCode,
        })
        .then((res) => {
          if (res.code === 1000) {
            this.RegionList = res.data
          }
        })
    },
    getSKU() {
      selectAPI.querySkuSelect().then((res) => {
        if (res.code === 1000) {
          this.skuArr = res.data
        }
      })
    },
    // 客户
    getCustomerList() {
      this.filterObj.customerCode = ''
      selectAPI
        .queryCustomerList({
          channelCode: this.filterObj.channelCode,
        })
        .then((res) => {
          if (res.code === 1000) {
            this.customerArr = res.data
          }
        })
    },
    // 经销商
    getDistributorList() {
      selectAPI
        .queryDistributorList({
          customerMdmCode: this.filterObj.customerMdmCode,
        })
        .then((res) => {
          if (res.code === 1000) {
            this.distributorArr = res.data
          }
        })
    },
    // 导入文件检索后保存
    saveImportInfo() {
      API.saveImportInfo({
        // mainId: this.mainIdLocal
        saveFlag: this.isAiQin==0?1:2,
        channelName: this.filterObj.channelCode,
        yearAndMonth: this.localDate,
      }).then((res) => {
        if (res.code === 1000) {
          this.closeimportDialog()
          this.getTableData()
          this.$message.success('保存成功！')
        } else {
          this.$message.error('保存失败！')
        }
      })
    },
    // 导出错误信息
    exportErrorList() {
      API.exportErrorList({
        // mainId: this.mainIdLocal
        channelName: this.filterObj.channelCode,
        yearAndMonth: this.localDate,
      }).then((response) => {
        const fileName = '错误信息' + new Date().getTime() + '.xlsx'
        //   res.data:请求到的二进制数据
        const blob = new Blob([response], {
          type: 'application/vnd.ms-excel',
        }) // 1.创建一个blob
        const link = document.createElement('a') // 2.创建一个a链接
        link.download = fileName // 3.设置名称
        link.style.display = 'none' // 4.默认不显示
        link.href = URL.createObjectURL(blob) // 5.设置a链接href
        document.body.appendChild(link) // 6.将a链接dom插入当前html中
        link.click() // 7.点击事件
        URL.revokeObjectURL(link.href) // 8.释放url对象
        document.body.removeChild(link) // 9.移除a链接dom
      })
    },
    // 导出excel
    exportExcelInfo() {
      API.exportExcel({
        // mainId: this.mainIdLocal,
        channelName: this.filterObj.channelCode,
        customerName: this.filterObj.customerCode,
        distributorName: this.filterObj.distributorCode,
        productName: this.filterObj.productCode,
        regionName: this.filterObj.regionName,
        yearAndMonth: this.localDate,
      }).then((response) => {
        const fileName = `${this.localDate}_Price_${this.filterObj.channelCode}_V1_查询.xlsx`
        //   res.data:请求到的二进制数据
        const blob = new Blob([response], {
          type: 'application/vnd.ms-excel',
        }) // 1.创建一个blob
        const link = document.createElement('a') // 2.创建一个a链接
        link.download = fileName // 3.设置名称
        link.style.display = 'none' // 4.默认不显示
        link.href = URL.createObjectURL(blob) // 5.设置a链接href
        document.body.appendChild(link) // 6.将a链接dom插入当前html中
        link.click() // 7.点击事件
        URL.revokeObjectURL(link.href) // 8.释放url对象
        document.body.removeChild(link) // 9.移除a链接dom
      })
    },
    // 导入数据
    importData(flag) {
      if (this.filterObj.channelCode == '') {
        this.$message.info('请先选择渠道！')
      } else {
        if(flag) {
          this.isAiQin=1
        } else {
          this.isAiQin=0
        }
        this.importVisible = true
      }
    },
    // 确认导入
    confirmImport() {
      var formData = new FormData()
      formData.append('file', this.uploadFile)
      if(this.isAiQin) {
        formData.append('importType', 3)
      }else {
        formData.append('importType', 1)
      }
      // formData.append('mainId', this.mainIdLocal)
      formData.append('channelName', this.filterObj.channelCode)
      formData.append('yearAndMonth', this.localDate)
      API.importV1(formData)
        .then((response) => {
          if (response.code === 1000) {
            this.event.srcElement.value = '' // 置空
            this.uploadFileName = ''
            this.uploadFile = ''
            this.firstIsPass = false
            if (response.data.length > 0 && typeof response.data !== 'string') {
              this.$message({
                type: 'success',
                message: messageMap().checkSuccess,
              })
              this.checkedData = response.data
              this.saveBtn = response.data[0].judgmentType !== 'Error'
            } else {
              this.checkedData = []
              this.$message({
                type: 'error',
                message: messageMap().checkError,
              })
            }
          } else {
            this.uploadFileName = ''
            this.uploadFile = ''
            this.$message({
              type: 'error',
              message: messageMap().checkError,
            })
          }
          // 清除input的value ,上传一样的
          this.event.srcElement.value = '' // 置空
        })
        .catch(() => {})
    },
    // 选择导入文件
    parsingExcelBtn() {
      this.saveBtn = false
      this.firstIsPass = false
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    // 导入
    parsingExcel(event) {
      this.event = event
      this.uploadFileName = event.target.files[0].name
      this.uploadFile = event.target.files[0]
      this.routineCheck(this.uploadFile)
    },
    // 第一次检测数据
    routineCheck(file) {
      var formData = new FormData()
      formData.append('file', file)
      if(this.isAiQin) {
        formData.append('importType', 3)
      }else {
        formData.append('importType', 1)
      }
      formData.append('yearAndMonth', this.localDate)
      formData.append('channelName', this.filterObj.channelCode)
      API.routineCheck(formData)
        .then((response) => {
          if (response.code === 1000) {
            this.event.srcElement.value = '' // 置空
            // this.uploadFile = ''
            this.$message({
              type: 'success',
              message: messageMap().importSuccess,
            })
            if (response.data != null) {
              if (response.data.length === 0) {
                this.$message({
                  type: 'info',
                  message: '导入数据为空，请检查模板！',
                })
                this.firstIsPass = false
              } else {
                this.firstIsPass =
                  response.data[0].judgmentType !== 'Error' &&
                  response.data[0].judgmentType !== ''
              }
              this.checkedData = response.data
            } else {
              this.checkedData = []
            }
          } else {
            this.$message({
              type: 'error',
              message: messageMap().importError,
            })
            this.checkedData = []
          }
          this.event.srcElement.value = ''
        })
        .catch(() => {
          this.event.srcElement.value = ''
          this.uploadFile = ''
          this.uploadFileName = ''
          this.checkedData = []
        })
    },
    // 关闭导入
    closeImport() {
      this.importVisible = false
      this.isAiQin=0
      this.event.srcElement.value = '' // 置空
      this.uploadFileName = ''
      this.uploadFile = ''
    },

    // 文件上传
    uploadFileLocal() {
      this.$refs.upload.submit()
    },
    fileChange(file, fileList) {
      // 这是关键一句
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
    },
    //计算
    Calculation() {
      API.calculation({
        yearAndMonth: this.localDate,
        channelName: this.filterObj.channelCode,
      }).then((res) => {
        if (res.code === 1000) {
          this.getTableData()
          this.$message.success(`计算成功`)
        } else {
           this.$message.info(`计算失败`)
        }
      })
    },
    // 提交
    submitInfo() {
      if (this.tableData[0].judgmentType === null) {
        this.$message({ type: 'info', message: '数据未校验，请先进行导入验证' })
        // this.$confirm('数据未校验，请先进行导入验证', '提示', {
        //   confirmButtonText: '确定',
        //   type: 'warning'
        // })
        //   .then(() => {
        //     this.$message({
        //       type: 'success',
        //       message: '已确定'
        //     })
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消'
        //     })
        //   })
      } else {
        this.$confirm('此操作将进行提交操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            API.submitV1({
              mainId: this.mainIdLocal,
            })
              .then((res) => {
                if (res.code === 1000) {
                  this.getTableData()
                  this.$message({
                    type: 'success',
                    message: '提交成功!',
                  })
                }
              })
              .catch()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交',
            })
          })
      }
    },
    // 下载excel模板
    downLoadElxModel() {

      API.downExcelTmpForV1({
        // mainId: this.mainIdLocal,
        ImportType: this.isAiQin==0?1:3,
        channelName: this.filterObj.channelCode,
        yearAndMonth: this.localDate,
      }).then((response) => {
        let fileName=''
        if(this.isAiQin) {
          fileName = `${this.localDate}_Price_${this.filterObj.channelCode}_爱亲/爱婴岛V1申请.xlsx`
        } else {
          fileName = `${this.localDate}_Price_${this.filterObj.channelCode}_V1申请.xlsx`
        }
        //   res.data:请求到的二进制数据
        const blob = new Blob([response], {
          type: 'application/vnd.ms-excel',
        }) // 1.创建一个blob
        const link = document.createElement('a') // 2.创建一个a链接
        link.download = fileName // 3.设置名称
        link.style.display = 'none' // 4.默认不显示
        link.href = URL.createObjectURL(blob) // 5.设置a链接href
        document.body.appendChild(link) // 6.将a链接dom插入当前html中
        link.click() // 7.点击事件
        URL.revokeObjectURL(link.href) // 8.释放url对象
        document.body.removeChild(link) // 9.移除a链接dom
      })
    },
    // 打开文件
    openFile(file) {
      // console.log(file)
      this.uploadFileName = file.name
      this.$refs.upload.clearFiles() // 去掉文件列表
    },
    // 关闭导入exportSuccess
    closeimportDialog() {
      this.importVisible = false
      this.checkedData = []
      this.saveBtn = false
    },

    // 导出数据
    exportData() {
      // 导出数据筛选
      var data = {}
      data = { ...this.filterObj }
      API.exportV3(data).then((res) => {
        this.downloadFile(res, 'V3' + '.xlsx') // 自定义Excel文件名
        this.$message.success(messageMap().exportSuccess)
      })
    },
    // 下载文件
    downloadFile(res, fileName) {
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      if (!fileName) {
        fileName = res.headers['content-disposition'].split('filename=').pop()
      }
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      }
    },
    // 获取表格数据
    getTableData() {
      this.tableData = []
      if (this.filterObj.channelCode == '' || this.localDate == '') {
        if (this.localDate == '') {
          this.$message.info(messageObj.requireMonth)
          return
        }
        if (this.filterObj.channelCode == '') {
          this.$message.info(messageObj.requireChannel)
        }
      } else {
        API.getPageV1({
          pageNum: this.pageNum, // 当前页
          pageSize: this.pageSize, // 每页条数
          channelName: this.filterObj.channelCode,
          customerName: this.filterObj.customerCode,
          distributorName: this.filterObj.distributorCode,
          productName: this.filterObj.productCode,
          regionName: this.filterObj.regionName,
          yearAndMonth: this.localDate,
        })
          .then((response) => {
            if (response.data.records.length > 0) {
              this.tableData = response.data.records
              this.mainIdLocal = response.data.records[0].mainId
              this.submitBtn = response.data.records[0].isSubmit
              this.isCalculation = response.data.records[0].isCalculation
              this.infoByMainId()
            } else {
              this.tableData = []
              this.mainIdLocal = null
              this.btnStatus = false
            }
            this.pageNum = response.data.pageNum
            this.pageSize = response.data.pageSize
            this.total = response.data.total
          })
          .catch((error) => {})
      }
    },
    // 通过与审批按钮控制
    infoByMainId() {
      API.infoByMainId({
        mainId: this.mainIdLocal,
      })
        .then((res) => {
          if (res.code === 1000) {
            if (
              res.data.version === 'V1' &&
              res.data.assignee.indexOf(this.usernameLocal) != -1 &&
              this.submitBtn === 0

            ) {
              this.btnStatus = true
            } else {
              this.btnStatus = false
            }
          } else {
            this.btnStatus = false
          }
        })
        .catch()
    },
    search() {
      this.pageNum = 1
      this.getTableData()
    },
    // 每页显示页面数变更
    handleSizeChange(size) {
      this.pageSize = size
      this.getTableData()
    },
    // 当前页变更
    handleCurrentChange(num) {
      this.pageNum = num
      this.getTableData()
    },
    // 行样式
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
  },
}
</script>

<style>
.el-icon-my-file {
  background: url('~@/assets/images/selFile.png') no-repeat;
  font-size: 16px;
  background-size: cover;
}
.el-icon-my-file:before {
  content: '\e611';
  font-size: 16px;
}
</style>

<style>
.el-icon-my-down {
  background: url('~@/assets/images/downModel.png') no-repeat;
  font-size: 16px;
  background-size: cover;
}
.el-icon-my-down:before {
  content: '\e611';
  font-size: 16px;
}
</style>
<style lang="scss" scoped>
::v-deep.my-el-dialog .upload-demo {
  display: flex;
  margin-top: 0px;
}
::v-deep.el-table td {
  padding: 6px 0;
}
::v-deep.el-upload-list__item:first-child {
  margin-top: 0px;
}
.MainContent {
  .priceLevelWrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .priceLevel {
      width: 60px;
      height: 34px;
      line-height: 34px;
      border-radius: 17px;
      background: #f2e9ea;
      color: #e87071 !important;
      text-align: center;
    }
    .priceCenter {
      background: #ebfbf8;
      color: #38d7b7 !important;
    }
    .priceLow {
      background: #e1edf4;
      color: #4192d3 !important;
    }
    .TotalNum {
      font-weight: bold;
      color: #ff8912;
    }
  }
}
</style>

<!--
 * @Description: V1RoadShow
 * @Date: 2022-04-28 14:44:18
 * @LastEditTime: 2022-06-27 17:12:03
-->
<template>
  <div class="MainContent">
    <!-- 查询条件 -->
    <div class="SelectBarWrap">
      <div class="SelectBar">
        <div class="Selectli">
          <span class="SelectliTitle">活动月:</span>
          <el-select v-model="filterObj.month"
                     filterable
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in monthList"
                       :key="item.id"
                       :label="item.activityMonth"
                       :value="item.activityMonth" />
          </el-select>
        </div>
        <div class="Selectli"
             @keyup.enter="search">
          <span class="SelectliTitle">渠道:</span>
          <el-select v-model="filterObj.channelCode"
                     clearable
                     filterable
                     placeholder="请选择"
                     @change="getCustomerList">
            <el-option v-for="(item) in channelArr"
                       :key="item.channelCsName"
                       :label="item.channelCsName"
                       :value="item.channelCode" />
          </el-select>
        </div>
        <div class="Selectli">
          <span class="SelectliTitle">客户系统名称:</span>
          <el-select v-model="filterObj.customerCode"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="(item, index) in customerArr"
                       :key="index"
                       :label="item.customerCsName"
                       :value="item.customerCode" />
          </el-select>
        </div>
        <!-- <div class="Selectli">
          <span class="SelectliTitle">大区:</span>
          <el-select v-model="filterObj.zoneName"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="(item, index) in zoneArr"
                       :key="index"
                       :label="item.name"
                       :value="item.name" />
          </el-select>
        </div>

        <div class="Selectli">
          <span class="SelectliTitle">区域:</span>
          <el-select v-model="filterObj.regionName"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="(item, index) in regionArr"
                       :key="index"
                       :label="item.name"
                       :value="item.name" />
          </el-select>
        </div> -->

        <div class="Selectli">
          <span class="SelectliTitle">ECM item:</span>
          <el-select v-model="filterObj.ecmItem"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="(item, index) in BrandList"
                       :key="index"
                       :label="item.item"
                       :value="item.item" />
          </el-select>
          <!-- 下拉数据接口未对接 -->
        </div>

      </div>
      <div class="OpertionBar">
        <!-- <div class="TpmButtonBG"
             @click="getSmartPlan">
          <img src="@/assets/images/huoqu.png"
               alt="">
          <span class="text">获取Smart Plan数据</span>
        </div> -->
        <el-button type="primary"
                   class="TpmButtonBG"
                   @click="search">查询</el-button>
        <div class="TpmButtonBG"
             @click="downExcel">
          <img src="@/assets/images/export.png"
               alt="">
          <span class="text">导出</span>
        </div>
        <div class="TpmButtonBG"
             @click="clearsmartplan(filterObj)">
          <img src="../../../assets/images/delete_l.png"
               alt="" />
          <span class="text">清除数据</span>
        </div>
      </div>
    </div>
    <el-table :data="tableData"
              :max-height="maxheight"
              border
              :header-cell-style="HeadTable"
              :row-class-name="tableRowClassName"
              style="width: 100%">
      <el-table-column align="center"
                       width="460"
                       prop="cpId"
                       label="CPID"
                       fixed>
        <template v-slot:header>
          <div>CPID<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.cpId }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120"
                       align="center"
                       prop="yearAndMonth"
                       label="活动月">
        <template v-slot:header>
          <div>活动月<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.yearAndMonth }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120"
                       align="center"
                       prop="costType"
                       label="费用类型">
        <template v-slot:header>
          <div>费用类型<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.costTypeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="190"
                       align="center"
                       prop="minePackage"
                       label="Mine Package">
        <template v-slot:header>
          <div>Mine Package<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.minePackageName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180"
                       align="center"
                       prop="costItem"
                       label="费用科目">
        <template v-slot:header>
          <div>费用科目<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.costItemName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120"
                       align="center"
                       prop="channelCode"
                       label="渠道">
        <template v-slot:header>
          <div>渠道<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.channelName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220"
                       align="center"
                       prop="customerName"
                       label="客户系统名称">
        <template v-slot:header>
          <div>客户系统名称<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.customerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220"
                       align="center"
                       prop="brandName"
                       label="品牌">
        <template v-slot:header>
          <div>品牌<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.brandName }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="220"
                       align="center"
                       prop="brandName"
                       label="ECM item">
        <template v-slot:header>
          <div>ECM item<br>
            <span class="subTitle"> KA + Brand + Item</span>
          </div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.ecmItem }}
          </div>
        </template>
        <!-- 未对接接口,字段未改 -->
      </el-table-column>
      <el-table-column width="220"
                       align="right"
                       prop="voneCost"
                       label="V1计划费用(RMB)">
        <template v-slot:header>
          <div>
            V1计划费用(RMB)
            <br>
            <span class="subTitle"> KA + Brand + Item</span>
          </div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ FormatNum(scope.row.planCost) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220"
                       align="center"
                       prop="costAscriptionDept"
                       label="费用归属部门">
        <template v-slot:header>
          <div>费用归属部门<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.dept }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220"
                       align="center"
                       prop="costWriteoffMethod"
                       label="费用核销方式">
        <template v-slot:header>
          <div>费用核销方式<br><span class="subTitle">-</span></div>
        </template>
        <template slot-scope="scope">
          <div>
            {{ scope.row.cancelCost }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="TpmPaginationWrap">
      <el-pagination :current-page="pageNum"
                     :page-sizes="[100, 200, 500, 1000]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission'
import elDragDialog from '@/directive/el-drag-dialog'
import {
  getDefaultPermissions,
  getHeightHaveTab1,
  messageObj,
  downloadFile,
  formatThousandNum,
} from '@/utils'
import selectAPI from '@/api/selectCommon/selectCommon.js'
import API from '@/api/V1/ECM'
export default {
  name: 'V1ECM',
  directives: { elDragDialog, permission },

  data() {
    return {
      total: 0,
      pageSize: 100,
      pageNum: 1,
      filterObj: {
        zoneName: '', //大区
        regionName: '', //区域

        channelCode: '', //渠道
        customerCode: '', //客户系统名称
        month: '', //活动月
        ecmItem: '',
      },
      permissions: getDefaultPermissions(),
      channelArr: [],
      monthList: [],
      customerArr: [],
      tableData: [],
      zoneArr: [],
      regionArr: [],
      BrandList: [],
      maxheight: getHeightHaveTab1(),
    }
  },
  computed: {},
  watch: {
    'filterObj.channelCode'() {
      this.filterObj.customerCode = ''
      this.getCustomerList()
    },
  },
  created() {},
  mounted() {
    window.onresize = () => {
      return (() => {
        this.maxheight = getHeightHaveTab1()
      })()
    }
    this.getChannel()
    this.getAllMonth()
    this.getBrandList()
    // this.getzoneArr()
    // this.getregionArr()
  },
  methods: {
    //清除数据
    clearsmartplan({ yearAndMonth, channelCode }) {
      API.delsmartplanData({ yearAndMonth: this.filterObj.month, channelCode }).then((res) => {})
    },
    // 获取表格数据
    getTableData() {
      this.tableData = []
      if (this.filterObj.channelCode == '' || this.filterObj.month == '') {
        if (this.filterObj.month == '') {
          this.$message.info(messageObj.requireMonth)
          return
        }
        if (this.filterObj.channelCode == '') {
          this.$message.info(messageObj.requireChannel)
        }
      } else {
        API.getPage({
          pageNum: this.pageNum, // 当前页
          pageSize: this.pageSize, // 每页条数
          customerCode: this.filterObj.customerCode, //客户系统名称
          channelCode: this.filterObj.channelCode, //渠道
          //   zoneName: this.filterObj.zoneName, //大区
          //   regionName: this.filterObj.regionName, //区域
          yearAndMonth: this.filterObj.month, //活动月
          ecmItem: this.filterObj.ecmItem, //活动月
        }).then((response) => {
          this.tableData = response.data.records
          this.pageNum = response.data.pageNum
          this.pageSize = response.data.pageSize
          this.total = response.data.total
        })
      }
    },
    getAllMonth() {
      selectAPI.getAllMonth().then((res) => {
        this.monthList = res.data
      })
    },
    // 获取ContractItem
    getContractItemList() {
      selectAPI.getContractItemList().then((res) => {
        if (res.code === 1000) {
          this.ContractItemList = res.data
        }
      })
    },
    // 获取下拉框
    getChannel() {
      selectAPI.queryChannelSelect().then((res) => {
        if (res.code === 1000) {
          this.channelArr = res.data
          this.getCustomerList()
        }
      })
    },
    // 客户
    getCustomerList() {
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
    getBrandList() {
      selectAPI.getECMItemList({ minePackage: 'ECM' }).then((res) => {
        if (res.code === 1000) {
          this.BrandList = res.data
        }
      })
    },

    //千分位分隔符+两位小数
    FormatNum(num) {
      return formatThousandNum(num)
    },
    search() {
      this.pageNum = 1
      this.getTableData()
    },
    // 导出
    downExcel() {
      if (this.tableData.length) {
        API.exportExcel({
          customerCode: this.filterObj.customerCode, //客户系统名称
          channelCode: this.filterObj.channelCode, //渠道

          yearAndMonth: this.filterObj.month, //活动月
          ecmItem: this.filterObj.ecmItem, //ecmItem
        }).then((res) => {
          downloadFile(
            res,
            `${this.filterObj.month}_ECM_${this.filterObj.channelCode}_V1_查询.xlsx`
          ) //自定义Excel文件名
          this.$message.success('导出成功!')
        })
      } else {
        this.$message.info('数据为空')
      }
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

<style lang="scss" scoped>
</style>

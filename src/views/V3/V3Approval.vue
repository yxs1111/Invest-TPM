<!--
 * @Description:
 * @Date: 2021-11-03 14:17:00
 * @LastEditTime: 2022-11-29 09:14:08
-->
<template>
  <div class="tabViewsWrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" :name="item.name" v-for="(item, index) in routerList" :key="index">
        <!-- tab 内容 -->
        <template slot="label">
          <div class="TabWrap">
            <div>{{ item.name }}</div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import selectAPI from '@/api/selectCommon/selectCommon.js'
import { sortList } from '@/utils/index'
export default {
  data() {
    return {
      routerList: [],
      currentIndex: 0,
      activeName: '',
    }
  },
  computed: {},
  mounted() {
    this.queryMinePackageSelect()
  },
  methods: {
    tabInit() {
      if (sessionStorage.getItem('currentIndex')) {
        this.activeName = this.routerList[Number(this.currentIndex)].name
        this.$router.push(this.routerList[Number(this.currentIndex)].path)
      } else {
        this.activeName = this.routerList[0].name
        this.$router.push(this.routerList[0].path)
      }
    },
    handleClick(tab) {
      let index = Number(tab.index)
      this.currentIndex = index
      this.$router.push(this.routerList[index].path)
      sessionStorage.setItem('currentIndex', index)
    },
    // tab标签权限
    queryMinePackageSelect() {
      let signP = 0
      let signN = 0
      selectAPI
        .queryMinePackageSelect()
        .then((res) => {
          res.data.forEach((element) => {
            if (element.costType === 'Price Promotion' && signP === 0) {
              this.routerList.push({
                name: '价促',
                path: '/costManagement/V3/V3Approval/V3discountDiscountApproval',
                img: {
                  dark: require('@/assets/images/tab/tab2.png'),
                  light: require('@/assets/images/tab/tab2_l.png'),
                },
                minePackageName: 'Price Promotion',
              })
              signP = 1
            } else if (element.costType === 'New Users' && signN === 0) {
              this.routerList.push({
                name: 'NU',
                path: '/costManagement/V3/V3Approval/V3discountNUApproval',
                img: {
                  dark: require('@/assets/images/tab/tab3.png'),
                  light: require('@/assets/images/tab/tab3_l.png'),
                },
                minePackageName: 'New User',
              })
              signN = 1
            }
          })
          if (this.routerList.length === 0 || res.data.length === 0) {
            this.routerList = [
              {
                name: '价促',
                path: '/costManagement/V3/V3Approval/V3discountDiscountApproval',
                img: {
                  dark: require('@/assets/images/tab/tab2.png'),
                  light: require('@/assets/images/tab/tab2_l.png'),
                },
              },
              {
                name: '新客',
                path: '/costManagement/V3/V3Approval/V3discountNUApproval',
                img: {
                  dark: require('@/assets/images/tab/tab3.png'),
                  light: require('@/assets/images/tab/tab3_l.png'),
                },
              },
            ]
          }
          this.routerList = [
            ...this.routerList,
            {
              name: 'HIH rebate',
              path: '/costManagement/V3/V3Approval/V3HIHRebateApproval',
              img: {
                dark: require('@/assets/images/tab/tab_HIH.png'),
                light: require('@/assets/images/tab/tab_HIH_l.png'),
              },
              minePackageName: 'HIH Rebate',
            },
            {
              name: 'KA rebate',
              path: '/costManagement/V3/V3Approval/V3KARebateApproval',
              img: {
                dark: require('@/assets/images/tab/tab_KA.png'),
                light: require('@/assets/images/tab/tab_KA_l.png'),
              },
              minePackageName: 'KA Rebate',
            },
            {
              name: 'FMC',
              path: '/costManagement/V3/V3Approval/V3FMCApproval',
              img: {
                dark: require('@/assets/images/tab/tab_FMC.png'),
                light: require('@/assets/images/tab/tab_FMC_l.png'),
              },
              minePackageName: 'FMC',
            },
            {
              name: 'RS',
              path: '/costManagement/V3/V3Approval/V3RoadShowApproval',
              img: {
                dark: require('@/assets/images/tab/tab_RoadShow.png'),
                light: require('@/assets/images/tab/tab_RoadShow_l.png'),
              },
              minePackageName: 'Roadshow',
            },
            {
              name: 'Listing',
              path: '/costManagement/V3/V3Approval/V3ListingFeeApproval',
              img: {
                dark: require('@/assets/images/tab/tab_ListingFee.png'),
                light: require('@/assets/images/tab/tab_ListingFee_l.png'),
              },
              minePackageName: 'Listing fee',
            },
            {
              name: 'POSM-标',
              path: '/costManagement/V3/V3Approval/V3POSMApproval',
              img: {
                dark: require('@/assets/images/tab/tab_POSM.png'),
                light: require('@/assets/images/tab/tab_POSM_l.png'),
              },
              minePackageName: 'POSM - Standard',
            },
            {
              name: 'POSM-定',
              path: '/costManagement/V3/V3Approval/V3POSMCustomizeApproval',
              img: {
                dark: require('@/assets/images/tab/tab_POSM.png'),
                light: require('@/assets/images/tab/tab_POSM_l.png'),
              },
              minePackageName: 'POSM - Customized',
            },
            {
              name: 'ECM',
              path: '/costManagement/V3/V3Approval/V3ECMApproval',
              img: {
                dark: require('@/assets/images/tab/tab_POSM.png'),
                light: require('@/assets/images/tab/tab_POSM_l.png'),
              },
              minePackageName: 'ECM',
            },
            {
              name: 'Display',
              path: '/costManagement/V3/V3Approval/V3ApplyrovalDisplay',
              img: {
                dark: require('@/assets/images/tab/UnStraightGiving.png'),
                light: require('@/assets/images/tab/UnStraightGiving_l.png'),
              },
              minePackageName: 'Display',
            },
            {
              name: 'MMC',
              path: '/costManagement/V3/V3Approval/V3ApplyrovalMMC',
              img: {
                dark: require('@/assets/images/tab/UnStraightGiving.png'),
                light: require('@/assets/images/tab/UnStraightGiving_l.png'),
              },
              minePackageName: 'Mama class',
            },
            {
              name: 'Premium',
              path: '/costManagement/V3/V3Approval/V3PremiumApproval',
              img: {
                dark: require('@/assets/images/tab/StraightGiving.png'),
                light: require('@/assets/images/tab/StraightGiving_l.png'),
              },
              minePackageName: 'Premium',
            },
            {
              name: '价促-FG tin',
              path: '/costManagement/V3/V3Approval/V3FreeGoodsTinApproval',
              img: {
                dark: require('@/assets/images/tab/FreeGoodsTin.png'),
                light: require('@/assets/images/tab/FreeGoodsTin_l.png'),
              },
              minePackageName: 'Free Goods-Tin',
            },
            {
              name: 'NU-FG win2',
              path: '/costManagement/V3/V3Approval/V3FreeGoodsWin2Approval',
              img: {
                dark: require('@/assets/images/tab/FreeGoodsTin.png'),
                light: require('@/assets/images/tab/FreeGoodsTin_l.png'),
              },
              minePackageName: 'Free Goods-Win2',
            },
            {
              name: 'DM',
              path: '/costManagement/V3/V3Approval/V3DMApproval',
              img: {
                dark: require('@/assets/images/tab/FreeGoodsTin.png'),
                light: require('@/assets/images/tab/FreeGoodsTin_l.png'),
              },
              minePackageName: 'DM',
            },
            {
              name: 'Transport',
              path: '/costManagement/V3/V3Approval/V3TransportApproval',
              img: {
                dark: require('@/assets/images/tab/FreeGoodsTin.png'),
                light: require('@/assets/images/tab/FreeGoodsTin_l.png'),
              },
              minePackageName: 'Transport Costs',
            },
          ]
          let TabList = []
          sortList.forEach((item) => {
            let findIndex = this.routerList.findIndex((routerItem) => routerItem.minePackageName == item)
            if (findIndex != -1) {
              TabList.push(this.routerList[findIndex])
            }
          })
          this.routerList = TabList
          if (sessionStorage.getItem('currentIndex')) {
            this.currentIndex = Number(sessionStorage.getItem('currentIndex'))
          } else {
            this.currentIndex = 0
          }
          if (!this.$route.query.minePackageName) {
          } else {
            // 我的待办跳转
            this.currentIndex = this.routerList.findIndex((item) => item.minePackageName == this.$route.query.minePackageName)
            sessionStorage.setItem('currentIndex', this.currentIndex)
          }
          this.tabInit()
        })
        .catch()
    },
    // tabview 切换
    changeTab(index) {
      this.currentIndex = index
      sessionStorage.setItem('currentIndex', index)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabViews {
  width: 100%;
  height: 38px;
  display: flex;
  margin-left: 25px;
  .tabli {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 38px;
    background: #4192d3;
    border-radius: 6px 6px 0px 0px;
    margin-right: 20px;
    font-size: 11px;
    color: #fff;
    text-align: center;
    line-height: 15px;
    cursor: pointer;
    img {
      width: 17px;
      height: 17px;
      margin-right: 10px;
    }
  }
  .currentTabli {
    background-color: #fff;
    color: #666;
    font-weight: 600;
  }
}
</style>
<style lang="scss">
.el-tabs__header {
  margin-bottom: 0 !important;
}
.el-tabs__item {
  padding: 0 10px !important;
  height: 38px;
  background: #eff2f9;
  border-radius: 6px 6px 0px 0px;
  margin-right: 0px;
  border: 1px solid #e8e8ea;
  font-size: 14px;
  color: #999;
  text-align: center;
  cursor: pointer;
  &:hover {
    // background-color: #fff;
    color: #999;
  }
  .TabWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .TabImg {
      width: 17px;
      height: 17px;
      margin-right: 10px;
    }
  }
}
.el-tabs__item.is-active {
  background-color: #4192d3 !important;
  color: #fff !important;
}
.el-tabs__active-bar {
  display: none;
}
</style>

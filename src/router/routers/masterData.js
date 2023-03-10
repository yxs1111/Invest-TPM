import Layout from '@/layout/index'
import settings from '@/settings'
import { showRouter } from '@/utils'

export default function () {
  const activiti = [
    {
      path: '/master',
      component: Layout,
      code: 'mdm',
      name: 'master',
      meta: { title: '主数据管理', icon: 'masterData' },
      alwaysShow: true,
      children: [
        {
          path: '/NKAEC',
          name: 'NKAEC',
          code: 'mdm_NKAEC',
          component: () => import('@/views/master/nkaec/model.vue'),
          meta: { title: 'CPT数据', icon: 'apply' },
          redirect: '/nkaec/pages/nka',
          children: [
            // 组织架构
            {
              hidden: true,
              path: '/nkaec/pages/nka',
              code: 'mdm_NKAEC',
              name: 'NKA',
              component: () => import('@/views/master/nkaec/pages/nka.vue'),
              meta: {
                title: 'NKA Rawdata',
                icon: 'apply',
                activeMenu: '/NKAEC',
              },
            },
            {
              hidden: true,
              path: '/nkaec/pages/EC',
              code: 'mdm_NKAEC',
              name: 'EC',
              component: () => import('@/views/master/nkaec/pages/EC.vue'),
              meta: {
                title: 'EC Rawdata',
                icon: 'apply',
                activeMenu: '/NKAEC',
              },
            },
            {
              hidden: true,
              path: '/nkaec/pages/NKALine',
              code: 'mdm_NKAEC',
              name: 'NKALine',
              component: () => import('@/views/master/nkaec/pages/NKALine.vue'),
              meta: {
                title: 'NKA Guideline',
                icon: 'apply',
                activeMenu: '/NKAEC',
              },
            },
            {
              hidden: true,
              path: '/nkaec/pages/ECLine',
              code: 'mdm_NKAEC',
              name: 'ECLine',
              component: () => import('@/views/master/nkaec/pages/ECLine.vue'),
              meta: {
                title: 'EC Guideline',
                icon: 'apply',
                activeMenu: '/NKAEC',
              },
            },
          ],
        },
        {
          path: '/organization',
          name: 'organization',
          code: 'mdm_organization',
          alwaysShow: true,
          component: () => import('@/views/master/modelIndex.vue'),
          meta: { title: '组织架构', icon: 'apply' },
          // redirect: '/priceSale/saleComputeKeep',
          children: [
            // 组织架构
            {
              path: '/organization/Channel',
              code: 'mdm_channel',
              name: 'Channel',
              component: () => import('@/views/master/organization/Channel.vue'),
              meta: { title: '渠道', icon: 'approve' },
            },
            {
              path: '/organization/Customer',
              code: 'mdm_customer',
              name: 'Customer',
              component: () => import('@/views/master/organization/Customer.vue'),
              meta: { title: '客户', icon: 'approve' },
            },
            // {
            //   path: '/organization/CustomerTeam',
            //   code: 'mdm_customer_group',
            //   name: 'CustomerTeam',
            //   component: () =>
            //     import('@/views/master/organization/CustomerTeam.vue'),
            //   meta: { title: '客户组', icon: 'apply' }
            // },
            {
              path: '/organization/Store',
              code: 'mdm_store',
              name: 'Store',
              component: () => import('@/views/master/organization/Store.vue'),
              meta: { title: '门店', icon: 'approve' },
            },
            {
              path: '/organization/Dealers',
              code: 'mdm_Dealer',
              name: 'Dealers',
              component: () => import('@/views/master/organization/Dealers.vue'),
              meta: { title: '经销商', icon: 'approve' },
            },
            {
              path: '/organization/Supplier',
              code: 'mdm_supplier',
              name: 'Supplier',
              component: () => import('@/views/master/organization/Supplier.vue'),
              meta: { title: '供应商', icon: 'approve' },
            },
            {
              path: '/organization/SaleKJ',
              code: 'mdm_Sales_structure',
              name: 'SaleKJ',
              component: () => import('@/views/master/organization/saleKJ.vue'),
              meta: { title: '销售架构', icon: 'approve' },
            },
            // {
            //   path: '/organization/CustomerSupplier',
            //   code: 'mdm_supplier',
            //   name: 'CustomerSupplier',
            //   component: () =>
            //     import('@/views/master/organization/CustomerSupplier.vue'),
            //   meta: { title: '客户&经销商对应关系', icon: 'apply' }
            // }
          ],
        },
        // 产品信息
        {
          path: '/itemInfo',
          name: 'itemInfo',
          alwaysShow: true,
          code: 'mdm_product_information',
          component: () => import('@/views/master/modelIndex.vue'),
          meta: { title: '产品信息', icon: 'apply' },
          // redirect: '/priceSale/saleComputeKeep',
          children: [
            {
              path: '/itemInfo/Brand',
              code: 'mdm_brand',
              name: 'Brand',
              component: () => import('@/views/master/itemInfo/Brand.vue'),
              meta: { title: '品牌', icon: 'approve' },
            },
            {
              path: '/itemInfo/SKU',
              code: 'mdm_product',
              name: 'SKU',
              component: () => import('@/views/master/itemInfo/SKU.vue'),
              meta: { title: '产品', icon: 'approve' },
            },
          ],
        },
        // 价格促销
        {
          path: '/priceSale',
          name: 'priceSale',
          alwaysShow: true,
          code: 'mdm_Prices_and_promotions',
          component: () => import('@/views/master/modelIndex.vue'),
          meta: { title: '价格和促销', icon: 'apply' },
          // redirect: '/priceSale/saleComputeKeep',
          children: [
            // 价格主数据
            {
              path: '/priceSale/priceMasterData',
              name: 'PriceMasterData',
              code: 'mdm_Prices_mdm',
              component: () => import('@/views/master/priceSale/priceMasterData.vue'),
              meta: {
                title: '价格主数据',
                icon: 'approve',
              },
            },
            {
              // 价格档位维护
              path: '/priceSale/priceLevelKeep',
              name: 'PriceLevelKeep',
              code: 'mdm_Price stall_maintenance',
              component: () => import('@/views/master/priceSale/priceLevelKeep.vue'),
              meta: {
                title: '价格档位维护',
                icon: 'approve',
              },
            },
            // 促销计算维护
            {
              path: '/priceSale/saleComputeKeep',
              name: 'SaleComputeKeep',
              code: 'mdm_ calculation_maintenance',
              component: () => import('@/views/master/priceSale/saleComputeKeep.vue'),
              meta: {
                title: '价促计算维护',
                icon: 'approve',
              },
            },
            // {
            //   path: '/priceSale/PriceStallMasterData',
            //   code: 'PriceStallMasterData',
            //   name: 'PriceStallMasterData',
            //   component: () => import('@/views/master/priceSale/PriceStallMasterData.vue'),
            //   meta: { title: '价格档位', icon: 'form' }
            // },
            {
              path: '/priceSale/systemPool',
              code: 'mdm_Mechanism_pool',
              name: 'SystemPool',
              component: () => import('@/views/master/priceSale/model/sysPool.vue'),
              meta: { title: '机制池', icon: 'approve' },
              redirect: '/master/priceSale/systemPool',
              children: [
                {
                  hidden: true,
                  path: '/master/priceSale/systemPool',
                  code: 'mdm_Mechanism_pool',
                  name: 'systemPool1',
                  component: () => import('@/views/master/priceSale/systemPool.vue'),
                  meta: {
                    title: 'Price Promotion',
                    icon: 'apply',
                    activeMenu: '/priceSale/systemPool',
                  },
                },
                {
                  hidden: true,
                  path: '/master/priceSale/systemPoolNew',
                  code: 'mdm_Mechanism_pool',
                  name: 'SystemPoolNew',
                  component: () => import('@/views/master/priceSale/systemPoolNew.vue'),
                  meta: {
                    title: 'New User',
                    icon: 'apply',
                    activeMenu: '/priceSale/systemPool',
                  },
                },
              ],
            },
          ],
        },
        // 财务信息
        {
          path: '/financeInfo/priceSale',
          name: 'financeInfo',
          alwaysShow: true,
          code: 'mdm_Financial_Information',
          component: () => import('@/views/master/modelIndex.vue'),
          meta: { title: '财务信息', icon: 'apply' },
          alwaysShow: true,
          // redirect: '/priceSale/saleComputeKeep',
          children: [
            {
              path: '/RoleCostSubjectControl',
              code: 'mdm_Expense_Account',
              name: 'RoleCostSubjectControl',
              component: () => import('@/views/master/financeInfo/RoleCostSubjectControl.vue'),
              meta: { title: '费用科目', icon: 'approve' },
            },
            {
              path: '/WBSCodeEntity',
              code: 'mdm_wbsCode_Entity',
              name: 'WBSCodeEntity',
              component: () => import('@/views/master/financeInfo/WBSCodeEntity.vue'),
              meta: { title: 'WBS Code - Entity', icon: 'approve' },
            },
            // {
            //   path: '/WBSCodeYear',
            //   code: 'mdm_WbsMaintenance',
            //   name: 'WBSCodeYear',
            //   component: () =>
            //     import('@/views/master/financeInfo/WBSCodeYear.vue'),
            //   meta: { title: 'WBS Code - Year', icon: 'apply' }
            // },
            {
              path: '/WBSCodeBrand',
              code: 'mdm_wbsCode_Brand',
              name: 'WBSCodeBrand',
              component: () => import('@/views/master/financeInfo/WBSCodeBrand.vue'),
              meta: { title: 'WBS Code - Brand', icon: 'approve' },
            },
            {
              path: '/WBSCodeDepartment',
              code: 'mdm_wbsCode_Department',
              name: 'WBSCodeDepartment',
              component: () => import('@/views/master/financeInfo/WBSCodeDepartment.vue'),
              meta: { title: 'WBS Code - Department', icon: 'approve' },
            },
            {
              path: '/WbsMaintenance',
              code: 'mdm_WbsMaintenance',
              name: 'WbsMaintenance',
              component: () => import('@/views/master/financeInfo/WbsMaintenance.vue'),
              meta: { title: 'WBS Code - Customer', icon: 'approve' },
            },
            {
              path: '/IoMaintenance',
              code: 'mdm_IoMaintenance',
              name: 'IoMaintenance',
              component: () => import('@/views/master/financeInfo/IoMaintenance.vue'),
              meta: { title: 'IO维护', icon: 'approve' },
            },
          ],
        },
        // 规则控制
        {
          path: '/ruleCtrl',
          name: 'ruleCtrl',
          alwaysShow: true,
          code: 'mdm_Rule_control',
          component: () => import('@/views/master/modelIndex.vue'),
          meta: { title: '规则控制', icon: 'apply' },
          // redirect: '/priceSale/saleComputeKeep',
          children: [
            // 促销计算维护
            {
              path: '/ruleCtrl/splitRules',
              name: 'SplitRules',
              code: 'mdm_Split_rules',
              component: () => import('@/views/master/ruleCtrl/model/splitRulesM.vue'),
              meta: {
                title: '拆分规则',
                icon: 'approve',
              },
              redirect: '/master/ruleCtrl/model/splitRules',
              children: [
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRules',
                  code: 'mdm_Split_rules',
                  name: 'splitRules',
                  component: () => import('@/views/master/ruleCtrl/splitRules.vue'),
                  meta: {
                    title: 'Price Promotion',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/splitRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesNew',
                  code: 'mdm_Split_rules',
                  name: 'splitRulesNew',
                  component: () => import('@/views/master/ruleCtrl/splitRulesNew.vue'),
                  meta: {
                    title: 'New User',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/splitRules',
                  },
                },
              ],
            },
            // 价格主数据
            {
              path: '/ruleCtrl/testRules',
              code: 'mdm_testing_regulations',
              name: 'TestRules',
              component: () => import('@/views/master/ruleCtrl/model/testRulesM.vue'),
              meta: {
                title: '检验规则',
                icon: 'approve',
              },
              redirect: '/master/ruleCtrl/model/testRules',
              children: [
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/testRules',
                  code: 'mdm_testing_regulations',
                  name: 'TestRules1',
                  component: () => import('@/views/master/ruleCtrl/testRules.vue'),
                  meta: {
                    title: 'Price Promotion',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/testRulesNew',
                  code: 'mdm_testing_regulations',
                  name: 'TestRulesNew',
                  component: () => import('@/views/master/ruleCtrl/testRulesNew.vue'),
                  meta: {
                    title: 'New User',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesHIH',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesHIH',
                  component: () => import('@/views/master/ruleCtrl/splitRulesHIH.vue'),
                  meta: {
                    title: 'HIH',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesKA',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesKA',
                  component: () => import('@/views/master/ruleCtrl/splitRulesKA.vue'),
                  meta: {
                    title: 'KA',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesFMC',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesFMC',
                  component: () => import('@/views/master/ruleCtrl/splitRulesFMC.vue'),
                  meta: {
                    title: 'FMC',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesRoadShow',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesRoadShow',
                  component: () => import('@/views/master/ruleCtrl/splitRulesRoadShow.vue'),
                  meta: {
                    title: 'RoadShow',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesListingFee',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesListingFee',
                  component: () => import('@/views/master/ruleCtrl/splitRulesListingFee.vue'),
                  meta: {
                    title: 'Listing Fee',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesPOSMStandard',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesPOSMStandard',
                  component: () => import('@/views/master/ruleCtrl/splitRulesPOSMStandard.vue'),
                  meta: {
                    title: 'POSM-标准',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesPOSMCustomized',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesPOSMCustomized',
                  component: () => import('@/views/master/ruleCtrl/splitRulesPOSMCustomized.vue'),
                  meta: {
                    title: 'POSM-定制',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesECM',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesECM',
                  component: () => import('@/views/master/ruleCtrl/splitRulesECM.vue'),
                  meta: {
                    title: 'ECM',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesDisplay',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesDisplay',
                  component: () => import('@/views/master/ruleCtrl/splitRulesDisplay.vue'),
                  meta: {
                    title: 'Display',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesPremium',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesPremium',
                  component: () => import('@/views/master/ruleCtrl/splitRulesPremium.vue'),
                  meta: {
                    title: 'Premium',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesFreeGoods-Tin',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesFreeGoods-Tin',
                  component: () => import('@/views/master/ruleCtrl/splitRulesFreeGoods-Tin.vue'),
                  meta: {
                    title: 'Free Goods-Tin',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesFreeGoods-Win2',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesFreeGoods-Win2',
                  component: () => import('@/views/master/ruleCtrl/splitRulesFreeGoods-Win2.vue'),
                  meta: {
                    title: 'Free Goods-Win2',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesDM',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesDM',
                  component: () => import('@/views/master/ruleCtrl/splitRulesDM.vue'),
                  meta: {
                    title: 'DM',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesMMC',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesMMC',
                  component: () => import('@/views/master/ruleCtrl/splitRulesMMC.vue'),
                  meta: {
                    title: 'MMC',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
                {
                  hidden: true,
                  path: '/master/ruleCtrl/model/splitRulesTransport',
                  code: 'mdm_testing_regulations',
                  name: 'splitRulesTransport',
                  component: () => import('@/views/master/ruleCtrl/splitRulesTransport.vue'),
                  meta: {
                    title: 'Transport',
                    icon: 'form',
                    activeMenu: '/ruleCtrl/testRules',
                  },
                },
              ],
            },
            // {
            //   path: '/ruleCtrl/newUserC',
            //   name: 'NewUserC',
            //   component: () =>
            //     import(
            //       '@/views/master/ruleCtrl/newUserC.vue'
            //     ),
            //   meta: {
            //     title: '新客达成率',
            //     icon: 'form'
            //   }
            // }
          ],
        },
        // 产品信息
        {
          path: '/contractItem',
          name: 'contractItem',
          code: 'ContractItem',
          component: () => import('@/views/master/contractItem/contractItem.vue'),
          meta: { title: 'Contract Item', icon: 'apply' },
        },
        // 品牌拆分比例
        {
          path: '/brandsplitratio',
          name: 'brandsplitratio',
          code: 'BrandSplitRatio',
          component: () => import('@/views/master/brandsplitratio/brandsplitratio.vue'),
          meta: { title: '品牌拆分比例', icon: 'apply' },
        },
        // displayItem
        {
          path: '/displayItem',
          name: 'displayItem',
          code: 'ItemMatchingRelation',
          component: () => import('@/views/master/displayItem.vue'),
          meta: { title: '细项匹配关系', icon: 'apply' },
        },
        // 匹配关系
        {
          path: '/MatchingRelation',
          name: 'MatchingRelation',
          code: 'MatchingRelation',
          component: () => import('@/views/master/MatchingRelation.vue'),
          meta: { title: '大区（+区域）&供应商匹配关系', icon: 'apply' },
        },
        {
          path: '/pdMatchingRelationship',
          name: 'pdMatchingRelationship',
          code: 'pdMatchingRelationship',
          component: () => import('@/views/master/pdMatchingRelationship.vue'),
          meta: { title: 'Package&部门匹配关系', icon: 'apply' },
        },
      ],
    },
  ]
  if (showRouter([settings.stageKey])) {
    return []
  } else {
    return activiti
  }
}

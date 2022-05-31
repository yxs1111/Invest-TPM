/*
 * @Description:
 * @Date: 2021-09-16 09:36:50
 * @LastEditTime: 2022-05-31 09:30:24
 */
import Layout from '@/layout/index'
import settings from '@/settings'
import { showRouter } from '@/utils'

export default function() {
  const V1 = [
    {
      path: '/costManagement/V1',
      component: () => import('@/views/master/modelIndex.vue'),
      code: 'price_nka_v1',
      name: 'V1',
      alwaysShow: true,
      meta: { title: 'V1 - City plan 详细拆分', icon: 'V1' },
      children: [
        {
          path: '/costManagement/V1/V1Apply',
          code: 'price_nka_v1_apply',
          name: 'V1Apply',
          component: () => import('@/views/V1/V1Apply.vue'),
          meta: { title: '申请', icon: 'apply' },
          redirect: '/costManagement/V1/V1Apply/V1discountAll',
          children: [
            {
              hidden: true,
              path: '/costManagement/V1/V1Apply/V1discountAll',
              code: 'price_nka_v1_apply',
              name: 'V1discountAll',
              component: () => import('@/views/V1/V1Apply/V1discountAll.vue'),
              meta: { title: '折扣项-汇总', icon: 'form', activeMenu: '/costManagement/V1/V1Apply' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Apply/V1discountDiscount',
              code: 'price_nka_v1_apply',
              name: 'V1discountDiscount',
              component: () => import('@/views/V1/V1Apply/V1discountDiscount.vue'),
              meta: { title: '折扣项-价促', icon: 'form', activeMenu: '/costManagement/V1/V1Apply' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Apply/V1discountNU',
              code: 'price_nka_v1_apply',
              name: 'V1discountNU',
              component: () => import('@/views/V1/V1Apply/V1discountNU.vue'),
              meta: { title: '折扣项-新客', icon: 'form', activeMenu: '/costManagement/V1/V1Apply' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Apply/V1HIHRebate',
              code: 'price_nka_v1_apply',
              name: 'V1HIHRebate',
              component: () => import('@/views/V1/V1Apply/V1HIHRebate.vue'),
              meta: { title: '折扣项-HIH Rebate', icon: 'form', activeMenu: '/costManagement/V1/V1Apply' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Apply/V1KARebate',
              code: 'price_nka_v1_apply',
              name: 'V1KARebate',
              component: () => import('@/views/V1/V1Apply/V1KARebate.vue'),
              meta: { title: '折扣项-KA Rebate', icon: 'form', activeMenu: '/costManagement/V1/V1Apply' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Apply/V1FMC',
              code: 'price_nka_v1_apply',
              name: 'V1FMC',
              component: () => import('@/views/V1/V1Apply/V1FMC.vue'),
              meta: { title: 'FMC', icon: 'form', activeMenu: '/costManagement/V1/V1Apply' }
            },
          ]
        },
        {
          path: '/costManagement/V1/V1Approval',
          code: 'price_nka_v1_approve',
          name: 'V1Approval',
          component: () => import('@/views/V1/V1ApprovalModel.vue'),
          meta: { title: '审批', icon: 'approve' },
          redirect: '/costManagement/V1/V1Approval/V1discountAllApproval',
          children: [
            {
              hidden: true,
              path: '/costManagement/V1/V1Approval/V1discountAllApproval',
              code: 'price_nka_v1_approve',
              name: 'V1discountAllApproval',
              component: () => import('@/views/V1/V1Approval/V1discountAllApproval.vue'),
              meta: { title: '折扣项-汇总', icon: 'form', activeMenu: '/costManagement/V1/V1Approval' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Approval/V1discountDiscountApproval',
              code: 'price_nka_v1_approve',
              name: 'V1discountDiscountApproval',
              component: () => import('@/views/V1/V1Approval/V1discountDiscountApproval.vue'),
              meta: { title: '折扣项-价促', icon: 'form', activeMenu: '/costManagement/V1/V1Approval' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Approval/V1discountNUApproval',
              code: 'price_nka_v1_approve',
              name: 'V1discountNUApproval',
              component: () => import('@/views/V1/V1Approval/V1discountNUApproval.vue'),
              meta: { title: '折扣项-新客', icon: 'form', activeMenu: '/costManagement/V1/V1Approval' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Approval/V1HIHRebate',
              code: 'price_nka_v1_approve',
              name: 'V1HIHRebateApprove',
              component: () => import('@/views/V1/V1Apply/V1HIHRebate.vue'),
              meta: { title: '折扣项-HIH Rebate', icon: 'form', activeMenu: '/costManagement/V1/V1Approval' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Approval/V1KARebate',
              code: 'price_nka_v1_approve',
              name: 'V1KARebateApprove',
              component: () => import('@/views/V1/V1Apply/V1KARebate.vue'),
              meta: { title: '折扣项-KA Rebate', icon: 'form', activeMenu: '/costManagement/V1/V1Approval' }
            },
            {
              hidden: true,
              path: '/costManagement/V1/V1Approval/V1FMCApproval',
              code: 'price_nka_v1_approve',
              name: 'V1FMCApprove',
              component: () => import('@/views/V1/V1Approval/V1FMCApproval.vue'),
              meta: { title: 'FMC', icon: 'form', activeMenu: '/costManagement/V1/V1Approval' }
            },
          ]
        }
      ]
    },
  ]
  if (showRouter([settings.stageKey])) {
    return []
  } else {
    return V1
  }
}

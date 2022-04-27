/*
 * @Description: 
 * @Date: 2022-04-21 09:55:35
 * @LastEditTime: 2022-04-26 16:26:03
 */
/*
 * @Description: 客户合同录入
 * @Date: 2021-12-06 14:02:53
 * @LastEditTime: 2022-04-15 09:32:27
 */
import requestApi from '@/api/request-api'
import request from '@/utils/request'

export default {
  url: '/cityplan/customerContract',
  distUrl: '/cityplan/distributorContract',
  //客户合同审批--查询列表
  getApproveList(params) {
    return requestApi.request_get(this.url+'/pageApproveTaskList', params)
  },
  saveApproveComments(params) {
    return requestApi.request_post(this.url+'/saveApproveComments', params)
  },
  //客户合同明细 --查询
  findOneSaveDetail(params) {
    return requestApi.request_post(this.url+'/findOne', params)
  },
  //客户合同审批--导出
  exportApprove(params) {
    return request({
      url: this.url+'/exportApproveTask',
      method: 'get',
      params: params,
      responseType: 'blob'
    })
  },
  //客户合同审批--审批
  approveCustomerContract(params) {
    return requestApi.request_post(this.url+'/approve', params)
  },
  //经销商合同审批--审批
  approveDistContract(params) {
    return requestApi.request_post(this.distUrl+'/approve', params)
  },
  getContractItemList(params) {
    return requestApi.request_get('/mdm/mdContractItem/getContractItemList', params)
  },
}

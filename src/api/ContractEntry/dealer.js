/*
 * @Description: 
 * @Date: 2022-04-15 13:29:35
 * @LastEditTime: 2022-04-15 13:38:29
 */
/*
 * @Description: 客户合同录入
 * @Date: 2021-12-06 14:02:53
 * @LastEditTime: 2022-04-15 09:32:27
 */
import requestApi from '@/api/request-api'
import request from '@/utils/request'

export default {
  url: '/cityplan/distributorContract',
  //经销商合同查询列表
  getPage(params) {
    return requestApi.request_get(this.url+'/getPage', params)
  },
  //新增合同
  add(params) {
    return requestApi.request_post(this.url+'/add', params)
  },
  //编辑合同
  update(params) {
    return requestApi.request_post(this.url+'/update', params)
  },
  //删除合同
  delete(params) {
    return requestApi.request_post(this.url+'/delete', params)
  },
  //条款明细保存
  saveContractDetail(params) {
    return requestApi.request_post(this.url+'/saveContractDetail', params)
  },
}

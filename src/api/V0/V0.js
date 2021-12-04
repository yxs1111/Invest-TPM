/*
 * @Description: 
 * @Date: 2021-11-18 15:04:46
 * @LastEditTime: 2021-12-03 17:34:42
 */
import requestApi from '@/api/request-api'
import request from '@/utils/request'

export default {
  //url: '/cityplan/investCpVZero',
  url: '/cityplan/investCpVZero',
  ImportUrl: '/cityplan/investCpVZeroEb',
  //获取V0数据
  getList(params) {
    return requestApi.request_get(this.url+'/getList', params)
  },
  //获取CPT 数据
  getCPTData(params) {
    return requestApi.request_get(this.url+'/createCPT', params)
  },
  //excel 导出
  exportExcel(params) {
    //二进制数据流转blob
    return request({
      url:this.url+'/downExcel',
      method:'get',
      params:params,
      responseType:'blob'
    })
  },
  //导入excel
  importExcel(params) {
    return requestApi.request_post(this.url+'/import', params)
  },
  //审批提交,审批驳回
  approve(params) {
    return requestApi.request_post(this.url+'/approve', params)
  },
  //v0数据异常项校验
  exceptionCheck(params) {
    return requestApi.request_get(this.ImportUrl+'/exceptionCheck', params)
  },
  //v0数据异常项保存
  exceptionSave(params) {
    return requestApi.request_get(this.ImportUrl+'/save', params)
  },
  //v0数据异常项校验
  exceptionDownExcel(params) {
    return requestApi.request_get(this.ImportUrl+'/downExcel', params)
  },
  getMonth(params) {
    return requestApi.request_get('/cityplan/baseEffectiveDateConfig/getEffectiveDate', params)
  },
  
}


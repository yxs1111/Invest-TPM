/*
 * @Description: 
 * @Date: 2021-11-18 15:04:46
 * @LastEditTime: 2022-01-03 15:50:03
 */
import requestApi from '@/api/request-api'
import request from '@/utils/request'

export default {
  url: '/cityplan/investCpVZero',
  // url: '/investCpVZero',
  ImportUrl: '/cityplan/investCpVZeroEb',
  // ImportUrl: '/investCpVZeroEb',
  //获取V0数据
  getList(params) {
    return requestApi.request_post(this.url+'/getList', params)
  },
  //获取V0 审批数据
  getApproveList(params) {
    return requestApi.request_post(this.url+'/getApproveList', params)
  },
  //获取CPT 数据
  getCPTData(params) {
    return requestApi.request_post(this.url+'/createCPT', params)
  },
  //获取Nu数据
  getNuData(params) {
    return requestApi.request_post('/cityplan/investCpNuVOneDetail/createCPT', params)
  },
  //excel 导出
  exportExcel(params) {
    //二进制数据流转blob
    return request({
      url:this.url+'/downExcel',
      method:'post',
      data:params,
      responseType:'blob'
    })
  },
  //导入excel
  importExcel(params) {
    return requestApi.request_post(this.url+'/import', params)
  },
  //常规项校验 导入
  conventionImport(params) {
    return requestApi.request_post(this.url+'/conventionImport', params)
  },
  //异常项校验 导入
  exceptionImport(params) {
    return requestApi.request_post(this.url+'/exceptionImport', params)
  },
  //审批提交,审批驳回
  approve(params) {
    return requestApi.request_post(this.url+'/approve', params)
  },
  //v0数据异常项校验
  exceptionCheck(params) {
    return requestApi.request_post(this.ImportUrl+'/exceptionCheck', params)
  },
  //v0数据异常项保存
  exceptionSave(params) {
    return requestApi.request_post(this.ImportUrl+'/save', params)
  },
  //v0数据异常项校验
  exceptionDownExcel(params) {
    //二进制数据流转blob
    return request({
      url:this.ImportUrl+'/downExcel',
      method:'post',
      data:params,
      responseType:'blob'
    })
    return requestApi.request_post(this.ImportUrl+'/downExcel', params)
  },
  getMonth(params) {
    return requestApi.request_get('/cityplan/baseEffectiveDateConfig/getEffectiveDate', params)
  },
  //获取CPT 数据是否存在
  isExist(params) {
    return requestApi.request_post(this.url+'/isExist', params)
  },
  
}


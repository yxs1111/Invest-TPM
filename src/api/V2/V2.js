/*
 * @Description:
 * @Date: 2021-11-18 15:04:46
 * @LastEditTime: 2022-06-13 16:26:42
 */
import requestApi from '@/api/request-api'
import request from '@/utils/request'

export default {
  displayUrl: '/cityplan/investCpDisplayVTwoDetail',
  url: '/cityplan/investCpVTwoDetail',
  ImportUrl: '/cityplan/investCpVTwoEb',
  NUUrl: '/cityplan/investCpNuVTwoDetail',
  ImportNuUrl: '/cityplan/investCpNuVTwoDetailEb',
  getPage(params) {
    return requestApi.request_get(this.url + '/getPage', params)
  },
  //downExcel
  exportExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.url + '/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //下载模板
  exportTemplateExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.url + '/downExcelTemplate',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //导入excel
  /**
   * 导入excel
   * @param {params} params
   * @returns request
   */
  importExcel(params) {
    return requestApi.request_post(this.url + '/import', params)
  },
  /**
   * 审批
   * @returns
   */
  approve(params) {
    return requestApi.request_post(this.url + '/approve', params)
  },
  //v1数据异常项校验
  exceptionCheck(params) {
    return requestApi.request_post(this.ImportUrl + '/exceptionCheck', params)
  },
  //二步校验
  exceptionCheckTwo(params) {
    return requestApi.request_post(this.url + '/importExceptionCheck', params)
  },
  //v1数据异常项保存
  exceptionSave(params) {
    return requestApi.request_post(this.ImportUrl + '/save', params)
  },
  //v1数据异常项校验
  exceptionDownExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.ImportUrl + '/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //NU
  getPageNU(params) {
    return requestApi.request_get(this.NUUrl + '/getPage', params)
  },
  //downExcel
  exportNUExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.NUUrl + '/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //downExcel NU下载模板
  exportNUTemplateExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.NUUrl + '/downExcelTemplate',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  /**
   * V2NU-导入excel
   * @param {params} params
   * @returns request
   */
  importNUExcel(params) {
    return requestApi.request_post(this.NUUrl + '/import', params)
  },
  //二次校验
  exceptionNUCheckTwo(params) {
    return requestApi.request_post(this.NUUrl + '/importExcelCheck', params)
  },
  /**
   * v2-NU审批
   * @returns
   */
  approveNU(params) {
    return requestApi.request_post(this.NUUrl + '/approve', params)
  },
  //获取NU 异常信息列表
  getExceptionNUList(params) {
    return requestApi.request_post(this.NUUrl + '/getApproveList', params)
  },
  //v2-NU 导出异常项
  exportNUExceptionExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.ImportNuUrl + '/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //v1数据异常项保存
  exceptionNUSave(params) {
    return requestApi.request_post(this.ImportNuUrl + '/save', params)
  },
  calculation(params) {
    return requestApi.request_get(
      '/cityplan/investCpVTwoDetail/toCalculation',
      params
    )
  },
  // display 查询列表
  displayList(params) {
    return request({
      url: '/cityplan/investCpDisplayVTwoDetail/getPage',
      method: 'get',
      params: params,
    })
  },
  // 通过与驳回按钮状态
  infoByMainId(params) {
    return requestApi.request_get('/cityplan/investCpV/infoByMainId', params)
  },
  // display导出
  excdisplayData(data) {
    return request({
      url: '/cityplan/investCpDisplayVTwoDetail/downExcel',
      method: 'post',
      data: data,
      responseType: 'blob',
    })
  },
  //display下载模板
  downExcelTemplate(params) {
    return request({
      url: this.displayUrl + '/downExcelTemplate',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //display导入
  importNormal(params) {
    return requestApi.request_post(this.displayUrl + '/importNormal', params)
  },
  //display校验
  displayexceptionCheck(params) {
    return requestApi.request_post(this.displayUrl + '/exceptionCheck', params)
  },
  //display异常项导出
  downExcelError(params) {
    return request({
      url: '/cityplan/investCpDisplayVTwoDetailEb/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //display保存
  save(params) {
    return requestApi.request_post(
      '/cityplan/investCpDisplayVTwoDetailEb/save',
      params
    )
  },
  //display提交、审批
  approve(params) {
    return requestApi.request_post(this.displayUrl + '/approve', params)
  },
}

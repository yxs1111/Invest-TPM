/*
 * @Description:
 * @Date: 2021-11-18 15:04:46
 * @LastEditTime: 2022-11-21 17:03:51
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
    return requestApi.request_post(this.url + '/getList', params)
  },
  getPage(params) {
    return requestApi.request_get(
      '/cityplan/investCpPriceVZeroDetail/getPage',
      params
    )
  },
  //获取V0 审批数据
  getApproveList(params) {
    return requestApi.request_post(this.url + '/getApproveList', params)
  },
  //获取CPT 数据
  getCPTData(params) {
    return requestApi.request_post('/cityplan/investCpVZero/createCPT', params)
  },
  //获取Nu数据
  getNuData(params) {
    return requestApi.request_post(
      '/cityplan/investCpNuVOneDetail/createCPT',
      params
    )
  },
  //获取Contract数据
  getContractData(params) {
    return requestApi.request_post(
      '/cityplan/investCpContractVOneDetail/createCPT',
      params
    )
  },
  // 获取POSM-定制 数据
  getPOSMData(params) {
    return requestApi.request_get(
      '/cityplan/investCpPosmCustomizedVOne/getCptData',
      params
    )
  },
  // 获取MMC妈妈班 数据
  getMMCData(data) {
    return requestApi.request_post(
      '/cityplan/investCpMamaclassVOneDetail/createByCPT',
      data
    )
  },
  //获取ListingFee数据
  getListingFee(params) {
    return requestApi.request_post(
      '/cityplan/investCpListingVOneDetail/createCPT',
      params
    )
  },
  //获取Premium数据
  getPremium(params) {
    return requestApi.request_post(
      '/cityplan/investCpSalesVOneDetail/createCPT',
      params
    )
  },
  //获取RoadShow数据
  getRoadShow(params) {
    return requestApi.request_post(
      '/cityplan/investCpRoadshowVOneDetail/create',
      params
    )
  },
  //获取ecm数据 investCpEcmVOneDetail/create
  getECMcreate(params) {
    return requestApi.request_post(
      '/cityplan/investCpEcmVOneDetail/create',
      params
    )
  },
  //获取dm数据 investCpEcmVOneDetail/create
  getDMcreate(params) {
    return requestApi.request_post(
      '/cityplan/investCpDmVOneDetail/create',
      params
    )
  },
  //获取Transport数据 investCpEcmVOneDetail/getCptData
  getTransportCreate(params) {
    return requestApi.request_get(
      '/cityplan/investCpTransportVOneDetail/getCptData',
      params
    )
  },
  //获取Free Goods数据 investCpFreegoodsVOneDetail/createByCPT
  getFreeGoods(params) {
    return requestApi.request_post(
      '/cityplan/investCpFreegoodsVOneDetail/createByCPT',
      params
    )
  },
  //获取Free Goods数据 investCpVOneEFmc/createVOneByCpt
  getFMC(params) {
    return requestApi.request_get(
      '/cityplan/investCpVOneEFmc/createVOneByCpt',
      params
    )
  },
  //excel 导出
  exportExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.url + '/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
  },
  //下载模板导出
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
  importExcel(params) {
    return requestApi.request_post(this.url + '/import', params)
  },
  //常规项校验 导入
  conventionImport(params) {
    return requestApi.request_post(this.url + '/conventionImport', params)
  },
  //异常项校验 导入
  exceptionImport(params) {
    return requestApi.request_post(this.url + '/exceptionImport', params)
  },
  //审批提交,审批驳回
  approve(params) {
    return requestApi.request_post(this.url + '/approve', params)
  },
  //v0数据异常项校验
  exceptionCheck(params) {
    return requestApi.request_post(this.ImportUrl + '/exceptionCheck', params)
  },
  //v0数据异常项保存
  exceptionSave(params) {
    return requestApi.request_post(this.ImportUrl + '/save', params)
  },
  //v0数据异常项校验
  exceptionDownExcel(params) {
    //二进制数据流转blob
    return request({
      url: this.ImportUrl + '/downExcel',
      method: 'post',
      data: params,
      responseType: 'blob',
    })
    return requestApi.request_post(this.ImportUrl + '/downExcel', params)
  },
  getMonth(params) {
    return requestApi.request_get(
      '/cityplan/baseEffectiveDateConfig/getEffectiveDate',
      params
    )
  },
  //获取CPT 数据是否存在
  isExist(params) {
    return requestApi.request_post(this.url + '/isExist', params)
  },
  //获取CPT 数据  ScenarioList 下拉数据
  getScenarioList(params) {
    return requestApi.request_get(this.url + '/getScenarioList', params)
  },
}

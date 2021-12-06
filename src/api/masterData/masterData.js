/*
 * @Author: your name
 * @Date: 2021-10-27 08:56:27
 * @LastEditTime: 2021-11-23 16:24:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \april-ui\src\api\masterData\masterData.js
 */
import requestApi from '@/api/request-api'
import request from '@/utils/request'

export default {

  /**
   * @description: 产品信息--查询
   * @param {*} params
   * @return {*}
   */
  getPageMdProduct(params) {
    return requestApi.request_get('/mdm/mdProduct/getPage', params)
  },
  /**
   * 产品信息--添加
   * @param {*} params
   * @returns
   */
  insertMdProduct(params) {
    return requestApi.request_post('/mdm/mdProduct/insert', params)
  },
  /**
   * 产品信息--更新
   * @param {*} params
   * @returns
   */
  updateMdProduct(params) {
    return requestApi.request_put('/mdm/mdProduct/update', params)
  },
  /**
   * @description: 产品信息--删除
   * @param {*} params
   * @return {*}
   */
  deleteMdProduct(params) {
    return requestApi.request_delete('/mdm/mdProduct/delete', params)
  },
  // 价格档位
  getPageMdPriceGear(params) {
    return requestApi.request_get('/mdm/mdPriceGear/getPage', params)
  },
  insertMdPriceGear(params) {
    return requestApi.request_post('/mdm/mdPriceGear/insert', params)
  },
  updateMdPriceGear(params) {
    return requestApi.request_put('/mdm/mdPriceGear/update', params)
  },
  deleteMdPriceGear(params) {
    return requestApi.request_delete('/mdm/mdPriceGear/delete', params)
  },
  // 渠道列表
  /**
   * @description: 渠道列表
   * @param {*} params
   * @return {*}
   */
  getPageMdChannelList(params) {
    return requestApi.request_get('/mdm/mdChannel/getMdChannelList', params)
  },
  /**
   * @description: 产品列表List
   * @param {*} params
   * @return {*}
   */
  getPageMdProductList(params) {
    return requestApi.request_get('/mdm/mdProduct/getMdProductList', params)
  },
  // 客户信息
  getPageMdCustomer(params) {
    return requestApi.request_get('/mdm/mdCustomer/getPage', params)
  },
  insertMdCustomer(params) {
    return requestApi.request_post('/mdm/mdCustomer/insert', params)
  },
  updateMdCustomer(params) {
    return requestApi.request_put('/mdm/mdCustomer/update', params)
  },
  deleteMdCustomer(params) {
    return requestApi.request_delete('/mdm/mdCustomer/delete', params)
  },
  // 渠道信息
  getPageMdChannel(params) {
    return requestApi.request_get('/mdm/mdChannel/getPage', params)
  },
  insertMdChannel(params) {
    return requestApi.request_post('/mdm/mdChannel/insert', params)
  },
  updateMdChannel(params) {
    return requestApi.request_put('/mdm/mdChannel/update', params)
  },
  deleteMdChannel(params) {
    return requestApi.request_delete('/mdm/mdChannel/delete', params)
  },
  // 经销商信息
  getPageMdDistributor(params) {
    return requestApi.request_get('/mdm/mdDistributor/getPage', params)
  },
  insertMdDistributor(params) {
    return requestApi.request_post('/mdm/mdDistributor/insert', params)
  },
  updateMdDistributor(params) {
    return requestApi.request_put('/mdm/mdDistributor/update', params)
  },
  deleteMdDistributor(params) {
    return requestApi.request_delete('/mdm/mdDistributor/delete', params)
  },
  // 费用科目
  getPageMdCostType(params) {
    return requestApi.request_get('/mdm/mdCostType/getPage', params)
  },
  insertMdCostType(params) {
    return requestApi.request_post('/mdm/mdCostType/insert', params)
  },
  updateMdCostType(params) {
    return requestApi.request_put('/mdm/mdCostType/update', params)
  },
  deleteMdCostType(params) {
    return requestApi.request_delete('/mdm/mdCostType/delete', params)
  },
  // 品牌信息
  getPageMdBrand(params) {
    return requestApi.request_get('/mdm/mdBrand/getPage', params)
  },
  insertMdBrand(params) {
    return requestApi.request_post('/mdm/mdBrand/insert', params)
  },
  updateMdBrand(params) {
    return requestApi.request_put('/mdm/mdBrand/update', params)
  },
  deleteMdBrand(params) {
    return requestApi.request_delete('/mdm/mdBrand/delete', params)
  },
  // 门店信息
  getPageMdStore(params) {
    return requestApi.request_get('/mdm/mdStore/getPage', params)
  },
  insertMdStore(params) {
    return requestApi.request_post('/mdm/mdStore/insert', params)
  },
  updateMdStore(params) {
    return requestApi.request_put('/mdm/mdStore/update', params)
  },
  deleteMdStore(params) {
    return requestApi.request_delete('/mdm/mdStore/delete', params)
  },
  // 规则控制---检验规则
  getPageByDto(params) {
    return requestApi.request_get('/mdm/mdExceptionRule/getPageByDto', params)
  },
  getCostTypeList(params) {
    return requestApi.request_get('/mdm/mdCostType/getCostTypeList', params)
  },
  getMdChannelList(params) {
    return requestApi.request_get('/mdm/mdChannel/getMdChannelList', params)
  },

  // 供应商信息
  getPageMdSupplier(params) {
    return requestApi.request_get('/mdm/mdSupplier/getPage', params)
  },
  insertMdSupplier(params) {
    return requestApi.request_post('/mdm/mdSupplier/insert', params)
  },
  updateMdSupplier(params) {
    return requestApi.request_put('/mdm/mdSupplier/update', params)
  },
  deleteMdSupplier(params) {
    return requestApi.request_delete('/mdm/mdSupplier/delete', params)
  },
  importSupplier(params) {
    return requestApi.request_post('/mdm/mdSupplier/importSupplier', params)
  },
  exportSupplier(params) {
    return request({
      url: 'mdm/mdSupplier/exportSupplier',
      method: 'post',
      params: params,
      responseType: 'blob'
    })
  },
  //客户组信息
  getPageMdCustomerGroup(params) {
    return requestApi.request_get('/mdm/mdCustomerGroup/getPage', params)
  },
  insertMdCustomerGroup(params) {
    return requestApi.request_post('/mdm/mdCustomerGroup/insert', params)
  },
  updateMdCustomerGroup(params) {
    return requestApi.request_put('/mdm/mdCustomerGroup/update', params)
  },
  deleteMdCustomerGroup(params) {
    return requestApi.request_delete('/mdm/mdCustomerGroup/delete', params)
  },
  // 机制池
  getPageByRequestConfig(params) {
    return requestApi.request_get('/mdm/mdCdmConfig/getPageByRequest', params)
  },
  insertDataConfig(params) {
    return requestApi.request_post('/mdm/mdCdmConfig/insertData', params)
  },
  updateConfig(params) {
    return requestApi.request_put('/mdm/mdCdmConfig/update', params)
  },
  deleteConfig(params) {
    return requestApi.request_delete('/mdm/mdCdmConfig/delete', params)
  },
  //价促计算维护
  getPageSaleComputeKeep(params) {
    return requestApi.request_get('/mdm/mdPricepromotionCalculationandmaintenance/getPageByDto', params)
  },
  importSaleComputeKeep(params) {
    return requestApi.request_post('/mdm/mdPricepromotionCalculationandmaintenance/importData', params)
  },
  exportSaleComputeKeep(params) {
    return request({
      url: 'mdm/mdPricepromotionCalculationandmaintenance/exportToExcel',
      method: 'get',
      params: params,
      responseType: 'blob'
    })
    // return requestApi.request_post('/mdm/mdPricepromotionCalculationandmaintenance/exportToExcel', params)
  },
  SaleComputeKeepTemplateDownload(params) {
    return request({
      url: 'mdm/mdPricepromotionCalculationandmaintenance/templateDownload',
      method: 'get',
      params: params,
      responseType: 'blob'
    })
    //return requestApi.request_get('/mdm/mdPricepromotionCalculationandmaintenance/templateDownload', params)
  },
  // 导入测试
  importNkaRawData(params) {
    return requestApi.request_post('/importData/importNkaRawData', params)
  },
  importNkaRawDataGuideline(params) {
    return requestApi.request_post('/importData/importNkaRawDataGuideline', params)
  },
  // 价格和促销
  downloadExcelSyspool() {
    return request({
      url: '/mdCdmConfig/downloadExcel',
      method: 'post',
      responseType: 'blob'
    })
  },
  importExcelSyspool(params) {
    return request({
      url: '/mdCdmConfig/importExcel',
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  exportExcelSyspool(data) {
    return request({
      url: '/mdCdmConfig/exportExcel',
      method: 'post',
      data: data,
      responseType: 'blob'
    })
  },
  // 拆分规则
  getPageByRequestSplitRule(params) {
    return requestApi.request_get('/mdm/mdSplitRuleConfig/getPageByRequest', params)
  },
  insertSplitRule(params) {
    return requestApi.request_post('/mdm/mdSplitRuleConfig/insertData', params)
  },
  updateSplitRule(params) {
    return requestApi.request_put('/mdm/mdSplitRuleConfig/updateData', params)
  },
  deleteSplitRule(params) {
    return requestApi.request_delete('/mdm/mdSplitRuleConfig/delete', params)
  },
  // NKAEC
  getPageByDtoNKA(params) {
    return requestApi.request_get('/importData/nkaRawData/getPageByDto', params)
  },
  getPageByDtoEC(params) {
    return requestApi.request_get('/importData/ecRawData/getPageByDto', params)
  },
  getPageByDtoNKAL(params) {
    return requestApi.request_get('/importData/nkaRawDataGuideline/getPageByDto', params)
  },
  getPageByDtoECL(params) {
    return requestApi.request_get('/importData/ecRawDataGuideline/getPageByDto', params)
  }

}

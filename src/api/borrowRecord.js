/**
* 借用记录api
* By lianghanbo on 2017/3/31
*/
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: 'api/borrowRecord'
})
// ==================================   公用  =================================
// 资源列表（借出或借入）
// 请求参数：handleID: '管理员/供应商', type: '借出/借用', currentPage: '', pageSize: '', search: ''
export const getList = params => { return instance.post('list', params) }

// 撤销
// handleID: '', id: '当前条'
export const handleCancel = params => { return instance.post('manager/cancel', params) }

// ==================================   管理员  ===============================
// 确认借出
// handleID: '', startTime: '', overTime: '', count: '', price: ''
export const managerConfirmBorrow = params => { return instance.post('manager/confirmBorrow', params) }

// 确认核算
// handleID: '', startTime: '', overTime: '', count: '', price: ''
export const managerConfirmCalculate = params => { return instance.post('manager/confirmCalculate', params) }

// ==================================   用户  =================================
// 更新操作
// handleID: '', startTime: '', overTime: '', count: '', price: ''
export const userUpdate = params => { return instance.post('user/update', params) }

// 归还操作
// handleID: '', startTime: '', overTime: '', count: '', price: ''
export const userRepay = params => { return instance.post('user/repay', params) }

// 归还详情
// handleID: '', id: ''
export const userRepayList = params => { return instance.post('user/detail', params) }

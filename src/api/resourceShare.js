/**
 * 资源分享api
 * By lianghanbo on 2017/3/31
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
import storage from '../module/storage'
var instance = axios.create({
  baseURL: 'api/supplier'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
const getUserId = () => {
  const user = storage.getUser()
  if (user) {
    return user.userId
  } else {
    return ''
  }
}
// 机器设备列表
// 参数：handleID: '', type: '', search: '', currentPage: ''

export const getResourcesList = (resourceTypeName, pageIndex, pageCount, resourcesCategoryId) => {
  return instance.post('getResourcesListByDebitIdAndName', {
    userId: getUserId(),
    resourceTypeName,
    pageIndex,
    pageCount,
    resourcesCategoryId
  })
}

export const addDebitBillByOtherSupplier = (creditSupplierId, resourcesId, borrowNum, borrowDateTime, returnDateTime) => {
  return instance.post('addDebitBillByOtherSupplier', {
    userId: getUserId(),
    creditSupplierId,
    resourcesId,
    borrowNum,
    borrowDateTime,
    returnDateTime
  })
}

export const getBillListLend = (searchText, pageIndex, pageCount) => {
  return instance.post('getBillListLend', {
    resourceTypeName: searchText,
    pageIndex,
    pageCount,
    userId: getUserId()
  })
}

export const getBillListBorrow = (searchText, pageIndex, pageCount) => {
  return instance.post('getBillListBorrow', {
    resourceTypeName: searchText,
    pageIndex,
    pageCount,
    userId: getUserId()
  })
}

export const updateBill = (billId, num, borrowDateTime, returnDateTime) => {
  return instance.post('updateBill',
    {
      billId,
      num,
      borrowDateTime,
      returnDateTime,
      userId: getUserId()
    })
}

export const deleteBill = (billId) => {
  return instance.post('deleteBill', {billId})
}

export const billApproval = (billId) => {
  return instance.post('billApproval', {billId, userId: getUserId()})
}

export const billApprovalRefuse = (billId) => {
  return instance.post('billApprovalRefuse', {billId, userId: getUserId()})
}

export const returnBill = (billId, num, borrowDateTime, returnDateTime) => {
  return instance.post('returnBill',
    {
      billId,
      num,
      userId: getUserId(),
      borrowDateTime,
      returnDateTime
    })
}

export const getSupplierById = (supplierId) => {
  return instance.post('getSupplierById', {supplierId})
}

export const checkReturn = (billId, returnNum, returnDateTime) => {
  return instance.post('checkReturn', {billId, returnNum, userId: getUserId(), returnDateTime})
}

export const checkResourcesEvacuate = ({resourcesId, evacuateNum}) => {
  return instance.post('checkResourcesEvacuate', {userId: getUserId(), resourcesId, evacuateNum})
}

export const checkResourcesInventory = ({resourcesId, inventoryNum}) => {
  return instance.post('checkResourcesInventory', {userId: getUserId(), resourcesId, inventoryNum})
}

export const checkResourcesAdmission = ({resourcesId, initNum}) => {
  return instance.post('checkResourcesAdmission',
    {userId: getUserId(), resourcesId, initNum})
}

export const resourcesAdmissionRefuse = ({resourcesId}) => {
  return instance.post('resourcesAdmissionRefuse', {userId: getUserId(), resourcesId})
}

/**
 * 资源管理api
 * By lianghanbo on 2017/3/31
 */
import axios from 'axios'
import storage from '../module/storage'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: '/api/supplier/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const getUser = () => { return storage.getUser() }

// =============================   公用请求   ==================================
// 资源列表
// 请求参数：handleID: '管理员/供应商', type: '所有/设别/耗材/资源', currentPage: '', pageSize: '', search: ''
// export const getSupplierList = params => { return instance.post('supplier/list', params) }

// =============================   供应商请求   ==================================
// 入场申请
// handleID: '', rsourceType: '', count: '', price: '', remark: ''
export const userApply = params => { return instance.post('user/apply', params) }

// 入场申请修改
// handleID: '', rsourceType: '', count: '', price: '', remark: '', cancle: '资源撤场？true:false'
export const userModification = params => { return instance.post('user/modification', params) }

// 入场申请占用量变更
// handleID: '', 占用量：''
export const userOccupy = params => { return instance.post('user/occupy', params) }

// =============================   管理员请求   ==================================
// handleID: '', type: '申报审核/盘点审核/撤场审核', resourceType: '', remark: '', count: '',
export const managerAudit = params => { return instance.post('manager/audit', params) }

/**
 * 供应商资源列表
 ***/
export const getSupplierList = ({resourceTypeName, pageIndex, pageCount, resourcesCategoryId} = {}) => {
  return instance.post('getResourcesListByCreditIdAndName',
    {
      userId: getUser().userId,
      resourceTypeName: resourceTypeName,
      pageIndex: pageIndex,
      pageCount: pageCount,
      resourcesCategoryId: resourcesCategoryId
    })
}

/**
 * 管理员资源列表
 * **/
export const getManagerList = ({resourceTypeName, pageIndex, pageCount, resourcesCategoryId} = {}) => {
  return instance.post('getResourcesListByManageUserId',
    {
      userId: getUser().userId,
      resourceTypeName: resourceTypeName,
      pageIndex: pageIndex,
      pageCount: pageCount,
      resourcesCategoryId: resourcesCategoryId
    })
}

/**
 * 入场登记
 * **/
export const entrance = ({resourcesTypeId, remark, initNum} = {}) => {
  return instance.post('resourcesAdmission',
    {
      userId: getUser().userId,
      resourcesTypeId: resourcesTypeId,
      remark: remark,
      initNum: initNum
    })
}

/**
 * 上传图片
 * **/
export const uploadImage = ({resourcesId, addImageList, delImageList} = {}) => {
  return instance.post('uploadFile',
    {
      resourcesId: resourcesId,
      addImageList: addImageList,
      delImageList: delImageList
    })
}

/**
 * 查看图片
 **/
export const getImage = ({resourcesId} = {}) => {
  return instance.post('viewImage',
    {
      resourcesId: resourcesId
    })
}

/**
 * 占用
 * **/
export const resourcesSelf = ({userId, resourcesId, selfNum} = {}) => {
  return instance.post('resourcesSelf',
    {
      userId: getUser().userId,
      resourcesId: resourcesId,
      selfNum: selfNum
    })
}

/**
 * 盘点变更
 * **/
export const checkResourcesInventory = ({resourcesId, inventoryNum} = {}) => {
  return instance.post('checkResourcesInventory',
    {
      userId: getUser().userId,
      resourcesId: resourcesId,
      inventoryNum: inventoryNum
    })
}

/**
 * 资源管理-撤场
 * **/
export const resourcesEvacuate = ({resourcesId, inventoryNum} = {}) => {
  return instance.post('resourcesEvacuate',
    {
      userId: getUser().userId,
      resourcesId: resourcesId,
      inventoryNum: inventoryNum
    })
}

export const resourcesInventory = ({resourcesId, inventoryNum} = {}) => {
  return instance.post('resourcesInventory',
    {
      userId: getUser().userId,
      resourcesId: resourcesId,
      inventoryNum: inventoryNum
    })
}

/**
 * 资源删除
 * **/
export const delResources = ({resourceId} = {}) => {
  return instance.post('delResourcesById',
    {
      resourceId: resourceId
    })
}

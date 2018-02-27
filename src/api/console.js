/**
 * 供应商API
 * By lianghanbo on 2017/3/31
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: 'api/supplier'
})

// 供应商 列表
export const getSupplierListByName = params => { return instance.post('getSupplierListByName', params) }
// 供应商 新增
export const addSupplier = params => { return instance.post('addSupplier', params) }
// 供应商 修改
export const updateSupplier = params => { return instance.post('updateSupplier', params) }

// 单位 列表
export const getUnitList = () => { return instance.post('getUnitList', {}) }
// 单位 新增
export const addUnit = params => { return instance.post('addUnit', params) }
// 单位 修改
export const updateUnit = params => { return instance.post('updateUnit', params) }

// 供应商类型 列表
export const getSupplierTypeList = () => { return instance.post('getSupplierTypeList', {}) }
// 供应商类型 新增
export const addSupplierType = params => { return instance.post('addSupplierType', params) }
// 供应商类型 修改
export const updateSupplierType = params => { return instance.post('updateSupplierType', params) }

// 资源类型(小类) 列表
export const getResourcesTypeList = (params) => { return instance.post('getResourcesTypeList', params) }
// 资源类型 新增
export const addResourcesType = params => { return instance.post('addResourcesType', params) }
// 资源类型 修改
export const updateResourcesType = params => { return instance.post('updateResourcesType', params) }

// 资源类别（大类） 列表
export const getCategoryList = () => { return instance.post('getCategoryList', {}) }
// 资源类别 新增
export const addCategory = params => { return instance.post('addCategory', params) }
// 资源类别 修改
export const updateCategory = params => { return instance.post('updateCategory', params) }

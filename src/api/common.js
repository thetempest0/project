/**
 * 公用请求
 * by lianghanbo on 2017/3/28
 */

import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: 'api'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 普通用户登录
export const userlogin = params => { return instance.post('userCenter/userLogin', params) }

// 管理员登录
export const adminlogin = params => { return instance.post('userCenter/manageUserLogin', params) }

// 旧密码确认
export const checkOldPassword = params => { return instance.post('userCenter/checkOldPassword', params) }

// 修改密码
export const updatePassword = params => { return instance.post('userCenter/updatePassword', params) }

// 重置密码
export const resetPassword = params => { return instance.post('userCenter/resetPassword', params) }

// 获取验证码
export const getCode = params => { return instance.post('getCode', params) }

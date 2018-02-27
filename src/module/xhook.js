/**
 * Created by Administrator on 2017/1/19.
 */
// import storage from './storage'
import {errorCode} from './errorCode'
// 拦截发送请求
xhook.before(function (request) {
  // const user = sessionStorage.getUser()
  // // 附加请求头token信息
  // if (user && user.token) {
  //   request.xhr.setRequestHeader('token', user.token)
  // }
})
// 拦截返回请求
xhook.after(function (request, response) {
  try {
    const data = JSON.parse(response.data)
    console.log(data)
    let message = ''
    /* 错误不提示 */
    data.messageType = 0
    if (!data || !data.meta || !data.meta.code) {
      return
    }
    if (data.meta.code === 100000) {
      message = '操作成功'
      /* 成功提示 */
      data.messageType = 1
    } else {
      message = errorCode(data.meta.code)
      if (message) {
        /* 错误提示 */
        data.messageType = 2
      }
    }
    /* 错误提示 */
    data.message = message
    response.text = JSON.stringify(data)
  } catch (error) {
    console.error(error)
  }
})

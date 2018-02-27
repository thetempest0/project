/**
 * Created by may on 2017/3/29.
 */
import * as api from '../../api'

// 获取验证码
export function runAsync () {
  return new Promise(function (resolve, reject) {
    api.common.getVerCode().then(response => {
      if (response.data.meta.code) {
        const path = response.data.data.verCodeImage
        resolve(path)
      }
    }).catch(error => {
      reject(error.response)
    })
  })
}

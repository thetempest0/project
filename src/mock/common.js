/**
 * by lianghanbo 2017/3/28
 */
 import Mock from 'mockjs'
 const baseUrl = 'api/'
 const Random = Mock.Random

 // 验证码
 Mock.mock(new RegExp(baseUrl + 'getVerCode'), 'post', options => {
   return Mock.mock({
     meta: {
       code: Mock.mock('@integer(100, 500)'),
       message: '我是模拟的信息'
     },
     data: {
       verCodeImage: Random.image('200x100', '#4A7BF7', Mock.mock('@increment(1000)'))
     }
   })
 })

 // 用户名重复校验
 Mock.mock(new RegExp(baseUrl + 'checkUserName'), 'post', response => {
   return Mock.mock({
     result: Mock.mock('@boolean')
   })
 })

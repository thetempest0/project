/**
 * 借用记录Mock
 * By lianghanbo on 2017/3/31
 */
 import Mock from 'mockjs'
 const baseUrl = 'api/borrowRecord/'

 // ======================   公用请求   ========================================
 // 资源列表（借出或借入）
 Mock.mock(new RegExp(baseUrl + 'list'), 'post', response => {
   let data = []
   for (let i = 0; i < Math.ceil(Math.random() * 10 + 10); i++) {
     data.push({
       id: 'A' + Mock.mock('@id'),
       provider: Mock.mock('@cname'),
       'assetType|1': [
         '挖掘机',
         '起重机',
         '打桩机',
         '大钻头',
         '小钻头'
       ],
       remark: Mock.mock('@cparagraph(1, 256)'),
       startTime: Date.parse(new Date(Mock.mock('@datetime'))),
       overTime: Date.parse(new Date(Mock.mock('@datetime')) + 100000),
       borrowed: Mock.mock('@integer(1, 100)'),
       repay: Mock.mock('@integer(0, 4)'),
       'unit|1': [
         '台',
         '个',
         '条',
         '块'
       ],
       totalPrice: Mock.mock('@integer(1000, 20000)'),
       isRepay: Mock.mock('@boolean'),
       status: Mock.mock('@integer(0, 3)') // 状态有3种，待审核，待结算，已结算，撤销
     })
   }

   return Mock.mock({
     meta: {
       code: 10000,
       message: '获取数据成功'
     },
     data: data,
     page: {
       currentPage: 1,
       pageCount: Mock.mock('@integer(1, 20)'),
       pageSize: Mock.mock('@integer(10, 100)')
     }
   })
 })

 // 撤销
 Mock.mock(new RegExp(baseUrl + 'managerCancel'), 'post', response => {
   return {
     meta: {
       code: 10000,
       message: '确认撤销操作成功'
     }
   }
 })

 // ==================================   管理员  ===============================
 // 确认借出
 Mock.mock(new RegExp(baseUrl + 'manager/confirmBorrow'), 'post', response => {
   return {
     meta: {
       code: 10000,
       message: '确认借出操作成功'
     }
   }
 })

 // 确认核算
 Mock.mock(new RegExp(baseUrl + 'manager/confirmCalculate'), 'post', response => {
   return {
     meta: {
       code: 10000,
       message: '确认核算操作成功'
     }
   }
 })

 // ==================================   用户  =================================
 // 更新操作
 Mock.mock(new RegExp(baseUrl + 'user/update'), 'post', response => {
   return {
     meta: {
       code: 10000,
       message: '更新操作成功'
     }
   }
 })

 // 归还操作
 Mock.mock(new RegExp(baseUrl + 'user/repay'), 'post', response => {
   return {
     meta: {
       code: 10000,
       message: '归还操作成功'
     }
   }
 })

 // 归还详情
 Mock.mock(new RegExp(baseUrl + 'user/detail'), 'post', response => {
   let data = []
   for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
     data.push({
       overTime: Date.parse(new Date(Mock.mock('@datetime')) + 100000),
       count: Mock.mock('@integer(1, 5)'),
       totalPrice: Mock.mock('@integer(2000, 10000)')
     })
   }
   return {
     meta: {
       code: 10000,
       message: '获取归还列表成功'
     },
     data: data
   }
 })

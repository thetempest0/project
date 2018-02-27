/**
 * 资源管理Mock
 * By lianghanbo on 2017/3/31
 */
// import Mock from 'mockjs'
// const baseURL = 'api/resourceManage/'

// 供应商资源列表
// Mock.mock(new RegExp(baseURL + 'supplier/list'), 'post', response => {
//   let data = []
//   for (let i = 0; i < Math.ceil(Math.random() * 10 + 10); i++) {
//     data.push({
//       'resourceType|1': ['挖掘机', '起重机', '打桩机', '水电工', '大钻头', '小钻头', '钢筋工', '水泥'],
//       remark: Mock.mock('@ctitle(1, 20)'),
//       number: Mock.mock('@integer(1, 100)'),
//       occupied: Mock.mock('@integer(1, 100)'),
//       loanable: Mock.mock('@integer(1, 100)'),
//       loaned: Mock.mock('@integer(1, 100)'),
//       'unit|1': ['台', '个', '条', '块'],
//       referencePrice: Mock.mock('@integer(1000, 20000)'),
//       'status|1': [{value: 1, text: '申请中'}, {value: 2, text: '已审核'}, {value: 3, text: '已撤销'}, {value: 4, text: '已通过'}]
//     })
//   }
//   return Mock.mock({
//     meta: {code: 10000, message: '获取数据成功'},
//     data: data,
//     page: {currentPage: 1, pageCount: Mock.mock('@integer(1, 20)'), pageSize: Mock.mock('@integer(10, 100)')}
//   })
// })

// 管理员资
// Mock.mock(new RegExp(baseURL + 'manager/list'), 'post', response => {
//   let data = []
//   for (let i = 0; i < Math.ceil(Math.random() * 10 + 10); i++) {
//     data.push({
//       supplierName: `杭州${Mock.mock('@ctitle(2, 4)')}设备有限公司`,
//       'resourceType|1': ['挖掘机', '起重机', '打桩机', '水电工', '大钻头', '小钻头', '钢筋工', '水泥'],
//       remark: Mock.mock('@ctitle(1, 20)'),
//       number: Mock.mock('@integer(1, 100)'),
//       occupied: Mock.mock('@integer(1, 100)'),
//       loanable: Mock.mock('@integer(1, 100)'),
//       loaned: Mock.mock('@integer(1, 100)'),
//       'unit|1': ['台', '个', '条', '块'],
//       referencePrice: Mock.mock('@integer(1000, 20000)'),
//       'status|1': [{value: 1, text: '申请中'}, {value: 2, text: '已审核'}, {value: 3, text: '已撤销'}, {value: 4, text: '已通过'}]
//     })
//   }
//   return Mock.mock({
//     meta: {code: 10000, message: '获取数据成功'},
//     data: data,
//     page: {currentPage: 1, pageCount: Mock.mock('@integer(1, 20)'), pageSize: Mock.mock('@integer(10, 100)')}
//   })
// })

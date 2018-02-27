/**
 * 资源共享Mock
 * By lianghanbo on 2017/3/31
 */
import Mock from 'mockjs'
const baseUrl = 'api/resourceShare/'
// Mock.setup({
//   timeout: 5000
// })
// const Random = Mock.Random

// 机器设备列表
Mock.mock(new RegExp(baseUrl + 'getList'), 'post', response => {
  let data = []
  for (let i = 0; i < Math.ceil(Math.random() * 10 + 10); i++) {
    data.push({
      provider: Mock.mock('@cname'),
      'assetType|1': [
        '挖掘机',
        '起重机',
        '打桩机',
        '大钻头',
        '小钻头'
      ],
      remark: Mock.mock('@cparagraph(1, 256)'),
      loanable: Mock.mock('@integer(1, 100)'),
      borrowed: Mock.mock('@integer(1, 100)'),
      'unit|1': [
        '台',
        '个',
        '条',
        '块'
      ],
      referencePrice: Mock.mock('@integer(1000, 20000)'),
      handle: '借用'
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

// 供应商详情
Mock.mock(new RegExp(baseUrl + 'getProvider'), 'post', response => {
  const list = ['新闻', '体育', 'NBA', '娱乐', '财经', '股票', '汽车', '科技', '手机', '数码', '女人', '直播', '视频', '旅游', '房产', '家居', '教育', '读书', '健康', '彩票']
  let operationScope = []
  for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
    operationScope.push(list[i])
  }

  return Mock.mock({
    meta: {
      code: 10000,
      message: '获取数据成功'
    },
    data: {
      // 供应商类型
      'providerType|1': [
        '房产建筑',
        '政府企业',
        '互联网金融',
        '公共服务',
        '医疗保险'
      ],
      tel: parseInt(135 + Mock.mock('@increment(100000000)')),
      // 供应商资质
      providerAptitude: Mock.mock('@cparagraph(1, 16)'),
      // 业务范围
      operationScope: operationScope
    }
  })
})

// 借用操作
Mock.mock(new RegExp(baseUrl + 'handleBorrow'), 'post', response => {
  return Mock.mock({
    meta: {
      code: 10000,
      message: '借用请求成功'
    }
  })
})

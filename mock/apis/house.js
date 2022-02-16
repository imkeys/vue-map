const Mock = require('mockjs')
const List = []
const count = 100
const imgurl = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
const content = '1 靠台湾街，附近就有公交车站。2 电梯房，单身公寓。3 小区绿化好，对面就是江头公园。4 周边商城 餐饮 银行 市场 种类齐全。'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    author: '@first',
    title: '@title(1, 10)',
    imgurl: imgurl,
    content: content,
    createDate: '@datetime',
    timestamp: +Mock.Random.date('T'),
    def: ['四室', '89', '南', '国联大厦'],
    tag: ['公寓', '限女生'],
    'fee|1': [500, 900, 1200, 1500, 1800, 2000, 2400, 2800, 3200, 3500, 3600, 4000, 5000, 8000]
  }))
}

module.exports = [
  {
    url: '/house/list',
    type: 'get',
    response: config => {
      const { type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => {
        return index < limit * page && index >= limit * (page - 1)
      })
      return {
        code: 200,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/house/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 200,
            data: article
          }
        }
      }
    }
  }
]

const Mock = require('mockjs');
const Random = Mock.Random;

Random.extend({
  order: function(date) {
    const order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // const order = ['未支付', '支付失败', '审核中', '审核失败', '待发货', '已发货', '交易成功', '已取消', '拒收退货中', '退款中', '已退款']
    return this.pick(order)
  },
  methodPayment: function(date) {
    // const methodPayment = ['信用支付', '联联支付', '微信支付', '京东支付'];
    const methodPayment = [1, 2, 3, 4];
    return this.pick(methodPayment)
  },
  returnsState: function (data) {
    // ['-', '未收货', '已收货']
    const returnsState = [0, 1, 2];
    return this.pick(returnsState)
  }
})
let arr = [];
for (let i = 0; i < 60; i++) {
  arr.push(Mock.mock({
    // 序号
    'id': i,
    // 订单号
    'orderNumber': Random.integer(1000000000, 9999999999),
    // 商品名称
    'name': '@cname',
    // Sku
    'sku': Random.integer(0, 9999),
    // 货号
    'itemNo': Random.integer(10000000, 99999999),
    // 订单金额
    'orderAmount': Random.integer(0, 9999),
    // 订单状态
    'orderState': '@order',
    // 支付方式
    'methodPayment': '@methodPayment',
    // 创建时间
    'createDate': Random.date(),
    // 购买人
    'purchaser': '@cname',
    // 用户id
    'userID': Random.integer(0, 9999),
    // 收货人
    'consignee': '@cname',
    // 收货地址
    'shippingAddress': '@city',
    // 联系方式
    'phone': Random.integer(10000000000, 19999999999),
    // 备注
    'remarks': Random.cparagraph(1,1),
    // 发货商家
    'deliver': '@cname',
    // 商家id
    'shopID': Random.integer(0, 9999),
    // 发货时间
    'deliveryTime': Random.date(),
    // 物流公司
    'logisticsCompany': Random.cparagraph(1,1),
    // 物流单号
    'logisticsID': Random.integer(10000000000, 99999999999),
    // 商家备注
    'shopRemarks': Random.cparagraph(1,1),
    // 退货状态
    'returnsState': '@returnsState'
  }))
}

module.exports = arr;
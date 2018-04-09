import express from 'express';
import order from '../../mock/order'
import url from 'url'

const router = express.Router();

router.get('/api/getOrder', (req, res) => {
  const {page, pageSum, filter} = url.parse(req.url, true).query;
  console.log(pageSum, page, filter);
  let arr = [];
  if (Number(filter)) {
    arr = order.filter(item => {
      return item.orderState === filter * 1;
    });
  } else {
    arr = order
  }
  res.json({
    data: arr.slice((page - 1)*pageSum, page*pageSum),
    len: arr.length,
    code: 1
  })
});

export default router
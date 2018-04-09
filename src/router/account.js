import express from 'express';

const router = express.Router();

router.get('/account', (req, res) => {
  const query = req.query;
    res.json({
      code: 1
    });
});

export default router
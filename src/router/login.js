import express from 'express';
import {userLogin} from "../model/login";

const router = express.Router();

router.post('/api/login', (req, res) => {
  const body = req.body;
  userLogin(body, function (code) {
    code.token = req.headers.token;
    res.json(
      code
    )
  })
});

export default router
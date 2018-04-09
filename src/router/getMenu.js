import express from 'express';
import {getDecipher} from '../config/tools'
import {navMenu} from '../model/login'

const router = express.Router();

router.get('/api/getMenu', (req, res) => {
  const username = getDecipher(req.headers.token).split('&')[0];
  navMenu(username, (data) => {
    res.json(data)
  });
});

export default router
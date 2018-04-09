import express from 'express';
import {Logon} from "../model/login";

const router = express.Router();

router.post('/logon', (req, res) => {
    const body = req.body;
    Logon( body, function (code) {
        console.log(code, 'code');
        res.json(
            code
        )
    })
});

export default router
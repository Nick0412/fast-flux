const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const PostService = require('../services/PostService');

router.use(expressJwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256']
}), (err, req, res, next) => {
    if (err.name === "UnauthorizedError") return res.status(400).send('Invalid token.');
    else next();
});

router.post('/posts', (req, res) => {
    console.log(req.user);
    return res.send('woot');
});

router.get('/posts', (req, res) => {
    console.log('got posts');
    // return res.status
});


module.exports = router;
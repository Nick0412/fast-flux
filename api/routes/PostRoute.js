const express = require('express')
const router = express.Router()
const expressJwt = require('express-jwt')
const PostService = require('../services/PostService')
const config = require('../config/index')

router.use(expressJwt({
  secret: config.token_secret,
  algorithms: ['HS256']
}), (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.status(400).send('Invalid token.')
  else {
    next()
  }
})

router.post('/posts', async (req, res) => {
  await PostService.create({
    userId: req.user.id,
    content: req.body.content
  })
  res.status(200)
})

router.put('/posts/:postId', async (req, res) => {
  await PostService.update({
    userId: req.user.id,
    postId: req.params.postId,
    content: req.body.content
  })
})

router.get('/posts/:postId', async (req, res) => {
  const result = await PostService.read({
    postId: req.params.postId
  })
  res.json(result)
})

router.delete('/posts/:postId', async (req, res) => {
  await PostService.delete({
    userId: req.user.id,
    postId: req.params.postId
  })
})

module.exports = router

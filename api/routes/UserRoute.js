const express = require('express')
const router = express.Router()
const joi = require('joi')

const UserService = require('../services/UserService')

const userOptions = {
  allowUnknown: true,
  abortEarly: false
}

router.get('/users', async (req, res) => {
  const message = await UserService.getAllUsers()
  // return res.status(200);
  return res.json(message)
})

router.get('/users/:id', async (req, res) => {
  const userId = req.params.id
  const message = await UserService.getUser(userId)
  return res.json(message)
})

// Create a new user if their handle does not exist.
router.post('/users', async (req, res) => {
  const userSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string(),
    handle: joi.string().required(),
    loc: joi.string().required(),
    password: joi.string().required(),
    birth_date: joi.date().required()
  })

  const { error, value } = userSchema.validate(req.body, userOptions)
  if (error) {
    const errorList = error.details.map(e => e.message).join(',')
    return res.status(400).send(errorList)
  } else {
    const { status, message } = await UserService.create(req.body)
    return res.status(status).send(message)
  }
})

// Moidfy information about user
// router.put('/users/:id', async (req, res) => {
//   const userId = req.params.id
//   const passwordSchema = joi.object({
//     password: joi.string().required
//   })
//   const { error, value } = passwordSchema.validate(req.body, userOptions)
//   if (error) {
//     const errorList = error.details.map(e => e.message).join(',')
//     return res.status(400).send(errorList)
//   } else {
//     const updateData = req.body
//     updateData.id = userId
//     await UserService.update(updateData)
//   }
// })

router.post('/users/login', async (req, res) => {
  const loginSchema = joi.object({
    handle: joi.string().required(),
    password: joi.string().required()
  })

  const { error, value } = loginSchema.validate(req.body, userOptions)
  if (error) {
    const errorList = error.details.map(e => e.message).join(',')
    return res.status(400).send(errorList)
  } else {
    const { status, message, key } = await UserService.login(req.body)
    return res.status(status).json({
      message: message,
      key: key
    })
  }
})

module.exports = router

require('dotenv').config()
const express = require('express')
const app = express()

const UserRoute = require('./routes/UserRoute')
const PostRoute = require('./routes/PostRoute')

app.use(express.json())
app.use(UserRoute)
app.use(PostRoute)

app.listen(process.env.PORT, () => {
  console.log('Listening')
})

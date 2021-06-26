require('dotenv').config();
const express = require('express');
const app = express();

const users = require('./routes/users');
const posts = require('./routes/posts');

app.use(express.json());
app.use(users);
app.use(posts);

app.listen(process.env.PORT, () => {
    console.log('Listening');
});
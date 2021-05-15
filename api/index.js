// Node packages
require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// User defined exports
const pool = require('./database/pgdb');

// Routes
const UsersRoutes = require('./routes/users');
const PostsRoutes = require('./routes/posts');

app.use(UsersRoutes);
app.use(PostsRoutes);

app.get('/', (req, res) => {
    res.send('Connected');
});




app.listen(process.env.PORT, () => {
    console.log('Listening on %s', process.env.PORT)
});

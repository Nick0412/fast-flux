require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const db = require('./database/db-orm');
const user = require('./models/user');
const post = require('./models/post');

post.create({
   user_id: 10,
   content: "This is my first post",
   post_timestamp: new Date(2008, 6, 30)
}).finally(() => console.log('Done'));

// user.create({
//     first_name: "Bill",
//     last_name: "fdsfs",
//     handle: "bst",
//     loc: "USA",
//     birth_date: new Date(1999, 4, 20),
//     join_timestamp: new Date(2010, 1, 17),
//     password: "badpass"
// })
//     .then((mod) => {
//         console.log('Done');
//     });

// db.authenticate()
//     .then(() => {
//         console.log('Connected');
//     })
//     .catch((e) => {
//         console.log(e + 'Rejected');
//     })
//     .finally(() => {
//         console.log('Completed');
//     });

// console.lo('test');g

// Routes
// const UsersRoutes = require('./routes/users');
// const PostsRoutes = require('./routes/posts');

// app.use(UsersRoutes);
// app.use(PostsRoutes);

// app.get('/', (req, res) => {
//     res.send('Connected');
// });




// app.listen(process.env.PORT, () => {
//     console.log('Listening on %s', process.env.PORT)
// });

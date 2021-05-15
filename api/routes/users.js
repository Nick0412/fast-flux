const express = require('express');
const router = express.Router();
const pools = require.main.require('./database/pgdb.js')

// Get all users from database
router.get('/users', (req, res) => {
    pools.query('SELECT * FROM ff.users')
        .then(res => console.log(res))
        .catch(e => console.error(e.stack));
});

// Get all info about one user from database
router.get('/users/:uid', (req, res) => {
    console.log('Getting user' + req.params.uid);
});

// Create a new user with an id
router.post('/users/:uid', (req, res) => {
    
});

// Update user
router.put('/users/:uid', (req, res) => {
    
});

// Delete a user
router.delete('/users/:uid', (req, res) => {
    
});


router.get('/users/:uid', (req, res) => {
    
});

module.exports = router;

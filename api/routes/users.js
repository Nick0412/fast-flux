const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');

const User = require('../models/user');
const saltRounds = 10;
const userSchema = joi.object({
    first_name: joi.string().required(),
    handle: joi.string().required(),
    loc: joi.string().required(),
    password: joi.string().required(),
    birth_date: joi.date().required()
});
const userOptions = {
    allowUnknown: true,
    abortEarly: false
};

// Create a new user if their handle does not exist.
router.post('/users', async (req, res) => {
    const { error, value } = userSchema.validate(req.body, userOptions);
    if (error) {
        errorList = error.details.map(e => e.message).join(',');
        res.status(400).send(errorList);
    }
    // If our schema is valid, hash the password and insert into the database.
    else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        User.findOne({
            where: {
                handle: req.body.handle
            }
        })
        .then((model) => {
            // No model exists in the database.
            if (model == null) {
                User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    handle: req.body.handle,
                    profile_picture: req.body.profile_picture,
                    loc: req.body.loc,
                    join_timestamp: new Date(Date.now()).toISOString(),
                    password: hashedPassword,
                    birth_date: new Date(req.body.birth_date)
                })
                .then(() => {
                    res.status(200).send('User created!');
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
            } 
            // Model does exist in database.
            else { 
                res.status(400).send('User not created: \"handle\" in use already.');
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        })
    }
});

module.exports = router;

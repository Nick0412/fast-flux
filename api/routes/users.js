const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const UserService = require('../services/UserService');

const saltRounds = 10;
const userSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string(),
    handle: joi.string().required(),
    loc: joi.string().required(),
    password: joi.string().required(),
    birth_date: joi.date().required()
});
const loginSchema = joi.object({
    handle: joi.string().required(),
    password: joi.string().required()
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
    else {
        const {status, message} = await UserService.create(req.body);
        res.status(status).send(message);
    }
});

router.post('/users/login', async (req, res) => {
    const { error, value } = loginSchema.validate(req.body, userOptions);
    if (error) {
        errorList = error.details.map(e => e.message).join(',');
        res.status(400).send(errorList);
    }
    else {
        const { status, message, key } = await UserService.login(req.body);
        res.status(status).json({
            message: message,
            key: key
        });
    }
});

module.exports = router;

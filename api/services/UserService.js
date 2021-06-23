const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

class UserService {
    static async create(userData) {
        // Try to find a user with the given handle in the database.
        const model = await UserModel.findOne({
            where: {
                handle: userData.handle
            }
        });
        // If the model is null, that means no user with that handle exists, so we can
        // create it.
        if (!model) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            try {
                await UserModel.create({
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    handle: userData.handle,
                    profile_picture: userData.profile_picture,
                    loc: userData.loc,
                    join_timestamp: new Date(Date.now()).toISOString(),
                    password: hashedPassword,
                    birth_date: new Date(userData.birth_date)
                });
                return {
                    status: 200,
                    message: "Successfully Created"
                };
            }
            catch (ex) {
                return {
                    status: 400,
                    message: "Exception."
                };
            }
        }
        // If the model is not null, that user exists.
        return {
            status: 400,
            message: "handle already exists."
        };
    }

    static async login(loginData) {
        // Find a user with the handle and get the following attributes.
        const model = await UserModel.findOne({
            where: {
                handle: loginData.handle,
            },
            attributes: ['password', 'id', 'handle']
        });

        if (!model) {
            return {
                status: 400,
                message: "The handle does not exist."
            };
        }
        else {
            const login = await bcrypt.compare(loginData.password, model.password);
            if (login) {
                const user = {
                    handle: model.handle,
                    id: model.id
                };
                const token = jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '2h'});
                return {
                    status: 200,
                    message: "Login success.",
                    key: token
                };
            }
            else {
                return {
                    status: 400,
                    message: "Credentials not valid."
                };
            }
        }
    }
}

module.exports = UserService;
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class UserService {
    static async create(userData) {
        const model = await UserModel.findOne({
            where: {
                handle: userData.handle
            }
        });
        console.log(model);
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
                    message: "Exception "
                };
            }
        }
        return {
            status: 400,
            message: "handle already exists."
        };
    }
}

module.exports = UserService;
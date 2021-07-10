const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserEmitter, UserEvents } = require('../events/UserEvents')

const saltRounds = 10

class UserService {
  static async create (userData) {
    // Try to find a user with the given handle in the database.
    const model = await UserModel.findOne({
      where: {
        handle: userData.handle
      }
    })
    // If the model is null, that means no user with that handle exists, so we can
    // create it.
    if (!model) {
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(userData.password, salt)

      try {
        await UserModel.create({
          first_name: userData.first_name,
          last_name: userData.last_name,
          handle: userData.handle,
          profile_picture: userData.profile_picture,
          loc: userData.loc,
          created_on: new Date(Date.now()).toISOString(),
          password: hashedPassword,
          birth_date: new Date(userData.birth_date)
        })
        delete userData.password
        UserEmitter.emit(UserEvents.USER_CREATED, userData)
        return {
          status: 200,
          message: 'Successfully Created'
        }
      } catch (ex) {
        return {
          status: 400,
          message: 'Exception. ' + ex
        }
      }
    }
    // If the model is not null, that user exists.
    return {
      status: 400,
      message: 'handle already exists.'
    }
  }

  static async login (loginData) {
    // Find a user with the handle and get the following attributes.
    const model = await UserModel.findOne({
      where: {
        handle: loginData.handle
      },
      attributes: ['password', 'id', 'handle']
    })

    if (!model) {
      return {
        status: 400,
        message: 'The handle does not exist.'
      }
    } else {
      const login = await bcrypt.compare(loginData.password, model.password)
      if (login) {
        const user = {
          handle: model.handle,
          id: model.id
        }
        const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '2h' })
        return {
          status: 200,
          message: 'Login success.',
          key: token
        }
      } else {
        return {
          status: 400,
          message: 'Credentials not valid.'
        }
      }
    }
  }

  static async getAllUsers () {
    let userList = await UserModel.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    userList = userList.map((m) => {
      return {
        id: m.id,
        first_name: m.first_name,
        last_name: m.last_name,
        handle: m.handle,
        profile_picture: m.profile_picture,
        loc: m.loc,
        birth_date: m.birth_date,
        created_on: m.created_on
      }
    })
    return userList
  }

  static async getUser (userID) {
    const user = await UserModel.findOne({
      where: {
        id: userID
      },
      attributes: {
        exclude: ['password']
      }
    })
    if (user == null) {
      return {
        message: 'User ID not found.'
      }
    } else {
      return user
    }
  }

  // static async update (updateData) {

  // }
}

module.exports = UserService

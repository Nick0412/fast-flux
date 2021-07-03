const { DataTypes } = require('sequelize')
const db = require('../database/db-orm')

const UserModel = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50)
  },
  handle: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  profile_picture: {
    type: DataTypes.BLOB
  },
  loc: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: false
  },
  modified_on: {
    type: DataTypes.DATE,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(80),
    allowNull: false
  }
})

module.exports = UserModel

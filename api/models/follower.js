const { DataTypes } = require('sequelize');
const db = require('../database/db-orm')

const Follower = db.define('followers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    follower: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    following: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    follow_timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Follower;
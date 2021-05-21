const { DataTypes } = require('sequelize');
const db = require('../database/db-orm')

const Comment = db.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    post: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.STRING(128)
    },
    comment_timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Comment;
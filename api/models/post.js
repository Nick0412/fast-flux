const { DataTypes } = require('sequelize');
const db = require('../database/db-orm')

const Post = db.define('posts', {
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
    content: {
        type: DataTypes.STRING(128)
    },
    post_timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = Post;
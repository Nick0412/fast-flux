const { Model, Sequelize } = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize({
    host:       config.postgres.host,
    port:       config.postgres.port,
    username:   config.postgres.username,
    password:   config.postgres.password,
    database:   config.postgres.database,
    dialect: 'postgres',
    schema: 'ff',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
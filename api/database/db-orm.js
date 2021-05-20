const { Model, Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host:       process.env.PGHOST,
    port:       process.env.PGPORT,
    username:   process.env.PGUSER,
    password:   process.env.PGPASS,
    database:   process.env.PGDB,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
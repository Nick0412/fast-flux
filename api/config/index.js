const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  port: process.env.PORT,
  postgres: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASS,
    database: process.env.PGDB
  },
  token_secret: process.env.TOKEN_SECRET
}

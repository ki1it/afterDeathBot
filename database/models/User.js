const sequelize = require('../lib/pgbaseConnector')
const Sequelize = require('sequelize')
const User = sequelize.define('User', {
  Telegram_id: {
    type: Sequelize.INTEGER,
    unique: true
  },
  Name: {
    type: Sequelize.TEXT
  },
  Time: {
    type: Sequelize.TEXT
  },
  Status: {
    type: Sequelize.TEXT
  }
})

module.exports = User

const sequelize = require('../lib/pgbaseConnector')
const Sequelize = require('sequelize')
const User = sequelize.define('User', {
  Active: {
    type: Sequelize.TEXT
  },
  Logo: {
    type: Sequelize.TEXT
  }
})

module.exports = User

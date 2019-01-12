const sequelize = require('../lib/pgbaseConnector')
const Sequelize = require('sequelize')
const Speach = sequelize.define('Speach', {
  Active: {
    type: Sequelize.TEXT
  },
  Logo: {
    type: Sequelize.TEXT
  }
})

module.exports = Speach

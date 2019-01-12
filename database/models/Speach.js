const sequelize = require('../lib/pgbaseConnector')
const Sequelize = require('sequelize')
const Speach = sequelize.define('Speach', {
  User_id: {
    type: Sequelize.INTEGER
  },
  Text: {
    type: Sequelize.TEXT
  },
  Send_to: {
    type: Sequelize.TEXT
  },
})

module.exports = Speach

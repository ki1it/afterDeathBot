const sequelize = require('../lib/pgbaseConnector')
const Sequelize = require('sequelize')
const Speech = sequelize.define('Speech', {
  User_id: {
    type: Sequelize.INTEGER
  },
  Text: {
    type: Sequelize.TEXT
  },
  Send_to: {
    type: Sequelize.TEXT
  },
    ChatTitle: {
        type: Sequelize.TEXT
    },
})

module.exports = Speech

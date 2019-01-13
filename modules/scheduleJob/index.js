var schedule = require('node-schedule')
const helpers = require('../telegram/helper')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var PermitTime = false

/**
 * @return {boolean}
 */
const User = require('../../database/models/User')
const Speech = require('../../database/models/Speech')

// let job1 = schedule.scheduleJob('00 12 */3 * *', async function () {
let job1 = schedule.scheduleJob('*/3 * * * *', async function () {
  let res = await User.findAll(
  {
    include: [ 'Speeches' ],
    where: {
    Status: 'Pending'
  }
  })
    .catch((err) => {
      console.log(err)
    })
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[i].Speeches.length; j++) {
      helpers.sendMess(res[i].Speeches[j].dataValues.Send_to, res[i].dataValues.Name, res[i].Speeches[j].dataValues.Text)
      Speech.destroy({
        where: {
          id: res[i].Speeches[j].dataValues.id
        }
      })
          .catch((err) => {
            console.log(err)
          })
    }
    await User.destroy(
        {
          where: {
            id: res[i].dataValues.id
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }


  res = await User.findAll(
      {
        where: {
          Status: 'Active'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  for (let i = 0; i < res.length; i++) {
      helpers.sendProveMess(res[i].dataValues.Telegram_id)
    await User.update({Status: 'Pending'},
        {
          where: {
            id: res[i].dataValues.id
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

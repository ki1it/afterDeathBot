var schedule = require('node-schedule')
const helpers = require('../telegram/helper')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var PermitTime = false

/**
 * @return {boolean}
 */
function GetPermitTime () {
  return PermitTime
}
module.exports.GetPermitTime = GetPermitTime

let job1 = schedule.scheduleJob('00 11 */3 * 1-7', async function () {

  await Girl.update({
    Active: 'Pending' },
  { where: {
    Active: { [Op.ne]: 'Pending' }
  }
  })
    .catch((err) => {
      console.log(err)
    })
  PermitTime = true
  let res = await Girl.findAll()
    .catch((err) => {
      console.log(err)
    })

  for (let i = 0; i < res.length; i++) {
    helpers.sendProveMess(res[i].dataValues.User_id)
  }
  console.log('Girls were asked to prove their activity')
})

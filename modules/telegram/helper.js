const Telegraf = require('telegraf')

const User = require('../../database/models/User')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

async function sendProveMess (id) {
  if (id !== undefined) {
    bot.telegram.sendMessage(id, 'Подтвердите свою активность, у Вас есть 2 часа, чтобы сделать это',
      Markup.inlineKeyboard(
        [
          Markup.callbackButton('Подтвердить', 'AproveActivity')
        ]
      ).extra())
  }
}

async function getInterlocutorId (id) {
  var res = await User.findAll({
    where: {
      Telegram_id: id
    }
  })
    .catch((err) => {
      console.log(err)
    })
  return res[0].ChatWith
}

async function getUserTypeById (id) {
  var res1 = await Client.findAll({
    where: {
      User_id: id
    }
  })
    .catch((err) => {
      console.log(err)
    })
  if (res1.length !== 0) {
    return 'Client'
  }
  var res2 = await Girl.findAll({
    where: {
      User_id: id
    }
  })
    .catch((err) => {
      console.log(err)
    })
  if (res2.length !== 0) {
    return 'Girl'
  }
  var res3 = await Agency.findAll({
    where: {
      User_id: id
    }
  })
    .catch((err) => {
      console.log(err)
    })
  if (res3.length !== 0) {
    return 'Agency'
  }
}

async function getUserName (id) {
  var res = await User.findAll({
    where: {
      Telegram_id: id
    }
  })
    .catch((err) => {
      console.log(err)
    })
  return res[0].Name
}

module.exports.getInterlocutorId = getInterlocutorId
module.exports.getUserTypeById = getUserTypeById
module.exports.getUserName = getUserName
module.exports.sendProveMess = sendProveMess

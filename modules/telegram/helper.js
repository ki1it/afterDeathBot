const Telegraf = require('telegraf')


const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

async function sendProveMess (id) {
  if (id !== undefined) {
    bot.telegram.sendMessage(id, 'Hi, it\'s me, prove that you are alive',
      Markup.inlineKeyboard(
        [
          Markup.callbackButton('Prove', 'AproveActivity')
        ]
      ).extra())
  }
}

async function sendMess (id, name, text) {
  if (id !== undefined) {
    bot.telegram.sendMessage(id, 'Last words of ' + name + ': ' + text)
  }
}

module.exports.sendMess = sendMess
module.exports.sendProveMess = sendProveMess

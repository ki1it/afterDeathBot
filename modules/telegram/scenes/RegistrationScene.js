const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

const User = require('../../../database/models/User')


const RegistrationScene = new WizardScene(
  'RegistrationScene',
  // Имя
  (ctx) => {
    ctx.reply('What is your name?')
    return ctx.wizard.next()
  },
  async (ctx) => {
    if (ctx.update.message === undefined) {
      return ctx.scene.enter('RegistrationScene')
    }
    let name = ctx.update.message.text
    await User.create({
      Status: 'Active',
      Name: name,
      Telegram_id:ctx.update.message.from.id
    })
      .catch((err) => {
        console.log(err)
      })

    ctx.reply('Добро пожаловать, ' + name + '!')
    return ctx.scene.enter('MainMenuScene')
  }
)

module.exports = RegistrationScene

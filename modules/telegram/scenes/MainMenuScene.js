const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

const fs = require('fs')

const User = require('../../../database/models/User')

const MainMenuScene = new WizardScene(
  'MainMenuScene',
  async (ctx) => {
    let tgId
    try { tgId = ctx.update.message.chat.id } catch (e) {
      console.log(e + ' чекай beginMM, битый месэдж')
    }
    try { tgId = ctx.update.callback_query.from.id } catch (e) {
      console.log(e + ' чекай beginMM, битый колбэк')
    }
      var res = await User.findAll({
          where: {
              Telegram_id: tgId
          }
      }).catch((err) => {
          console.log(err)
      })
      if (res.length === 0 ) {
          ctx.reply('Hi, I can help you pass your message to your friends. ')
          return ctx.scene.enter('RegistrationScene')

      } else {
          if (ctx.update.callback_query !== undefined && ctx.update.callback_query.data === 'AproveActivity') {
              User.update({
                  Status: 'Active'
              }, {
                  where: {
                      Telegram_id: ctx.update.callback_query.from.id
                  }
              })
                  .catch((err) => {
                      console.log(err)
                  })
              ctx.reply('Live long life')
          }
      ctx.replyWithMarkdown('Menu', Markup.keyboard(
          [
              ['Add message', 'Delete message'],
              ['Show my messages']

          ]
      ).extra())

    return ctx.wizard.next()
      }
  },
  (ctx) => {
    try {
      if (ctx.update.message.text === 'Add message') {
        return ctx.scene.enter('AddMessageScene')
      } else
      if (ctx.update.message.text === 'Show my messages') {
        return ctx.scene.enter('ShowMessageScene')
      } else
      if (ctx.update.message.text === 'Delete message') {
        return ctx.scene.enter('DeleteMessageScene')
      }
    } catch (e) {
      console.log('not include message in cMM')
    }

    ctx.wizard.back()
    return ctx.scene.enter('MainMenuScene')
  }
)

module.exports = MainMenuScene

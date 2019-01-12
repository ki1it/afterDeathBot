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
      ctx.replyWithMarkdown('Главное меню', Markup.keyboard(
          [
              ['🖊️Add message', '❓Правила сервиса'],
              ['💲Баланс', '⚙️Поддержка']
          ]
      ).extra())

    return ctx.wizard.next()
  },
  (ctx) => {
    try {
      if (ctx.update.message.text === 'Add message') {
        return ctx.scene.enter('RulesScene')
      } else
      if (ctx.update.message.text === '🖊️Редактировать анкету') {
        return ctx.scene.enter('EditClientProfileScene')
      } else
      if (ctx.update.message.text === '⚙️Поддержка') {
        return ctx.scene.enter('ProtectScene')
      } else
      if (ctx.update.message.text === '🖊Баланс') {
        return ctx.scene.enter('addBalanceScene')
      }
    } catch (e) {
      console.log('not include message in cMM')
    }

    ctx.wizard.back()
    return ctx.scene.leave()
  }
)

module.exports = MainMenuScene

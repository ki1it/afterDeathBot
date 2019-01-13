const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')


const Speech = require('../../../database/models/Speech')

const ShowMessageScene = new WizardScene(
  'ShowMessageScene',
  async (ctx) => {
    let tgId
    try { tgId = ctx.update.message.chat.id } catch (e) {
      console.log(e + ' чекай beginMM, битый месэдж')
    }
    try { tgId = ctx.update.callback_query.from.id } catch (e) {
      console.log(e + ' чекай beginMM, битый колбэк')
    }
      let res = await Speech.findAll({
          where:{
              User_id:ctx.update.message.from.id
          }
      })
          .catch((err) => {
              console.log(err)
          })
      let str = 'Your messages\n'
      for (var i = 0, len = res.length; i < len; i++) {
          str+= res[i].dataValues.Text + ' for chat ' + res[i].dataValues.ChatTitle + '\n'
      }
      ctx.reply(str)
    return ctx.scene.enter('MainMenuScene')
  }
)

module.exports = ShowMessageScene

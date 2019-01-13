const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

const fs = require('fs')

const Speech = require('../../../database/models/Speech')

const DeleteMessageScene = new WizardScene(
  'DeleteMessageScene',
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
      let str = 'Choose message to delete:\n'
      for (var i = 0, len = res.length; i < len; i++) {
          str+= '/' + res[i].dataValues.id + ' ' + res[i].dataValues.Text + ' for chat ' + res[i].dataValues.ChatTitle + '\n'
      }
      ctx.reply(str)

    return ctx.wizard.next()
  },
    async (ctx) => {
    try {
        let str = ctx.update.message.text
        str = str.substr(1);
        await Speech.destroy({
            where:{
                id:str
            }
        })
            .catch((err) => {
                console.log(err)
            })
      ctx.reply('Your message was deleted')
    } catch (e) {
      console.log('not include message in cMM')
    }

    return ctx.scene.enter('MainMenuScene')
  }
)

module.exports = DeleteMessageScene

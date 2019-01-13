const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

const User = require('../../../database/models/User')
const Speech = require('../../../database/models/Speech')

const RegistrationGroupScene = new WizardScene(
  'RegistrationGroupScene',
    (ctx) => {
      return ctx.wizard.next()
    },
  async (ctx) => {
    if (ctx.update.message === undefined) {
      return ctx.scene.enter('RegistrationGroupScene')
    }
    let text = ctx.update.message.text
    let MessId
    try {
      MessId  = text.split('_')
        if(MessId[0] === '/reggroup') {
            await Speech.update({
                Send_to: ctx.update.message.chat.id,
                ChatTitle: ctx.update.message.chat.title
            }, {where: {id: MessId[1]}})
                .catch((err) => {
                    console.log(err)
                })

            ctx.reply('Message was registred.')
        }
    } catch (e) {
      console.log('not include message in cMM')
    }


    return ctx.scene.enter('RegistrationGroupScene')
  }
)

module.exports = RegistrationGroupScene

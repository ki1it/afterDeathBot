const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')
const User = require('../../../database/models/User')

const helper = require('../helper')

const startScene = new WizardScene(
    'start_scene',
    async (ctx) => {
        let tgId
        try {
            tgId = ctx.update.message.chat.id
        } catch (e) {
            console.log(e + ' чекай старт, битый месэдж')
        }
        try {
            tgId = ctx.update.callback_query.from.id
        } catch (e) {
            console.log(e + ' чекай старт, битый колбэк')
        }
         if(tgId<0){
            return ctx.scene.enter('RegistrationGroupScene')
        }
        var res = await User.findAll({
            where: {
                Telegram_id: tgId
            }
        }).catch((err) => {
            console.log(err)
        })
        if(res === undefined)
            return ctx.scene.enter('start_scene')
        if (res.length === 0 ) {
            ctx.reply('Hi, I can help you pass your message to your friends. ')
            return ctx.scene.enter('RegistrationScene')

        } else {
            return ctx.scene.enter('MainMenuScene')

        }
    }
)

module.exports = startScene

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
        var res = await User.findAll({
            where: {
                Telegram_id: tgId
            }
        }).catch((err) => {
            console.log(err)
        })

        if (res.length === 0) {
            ctx.reply('Hi, I can help you pass your message to your friends. ')
            ctx.scene.enter('RegistrationScene')

        } else {
            ctx.scene.enter('MainMenuScene')

        }
    }
)

module.exports = startScene

const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

const fs = require('fs')

const User = require('../../../database/models/User')
const Speech = require('../../../database/models/Speech')

const AddMessageScene = new WizardScene(
  'AddMessageScene',
    (ctx) => {
        ctx.reply('What is the text of your message?')
        return ctx.wizard.next()
    },
    async (ctx) => {
        if (ctx.update.message === undefined) {
            return ctx.scene.enter('AddMessageScene')
        }
        let text = ctx.update.message.text
        let res = await Speech.create({
            Text: text,
            User_id:ctx.update.message.from.id
        })
            .catch((err) => {
                console.log(err)
            })

        ctx.reply('Ok, now add a bot to the group where your post will be posted. Send this message to this group: /reggroup_' + res.dataValues.id + ' You can add many groups.')
        return ctx.scene.enter('MainMenuScene')
    }
)

module.exports = AddMessageScene

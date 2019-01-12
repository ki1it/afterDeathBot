const Telegraf = require('telegraf')
const session = require('telegraf/session')

// ========== ImportScenes

const startScene = require('./scenes/startScene')
const RegistrationScene = require('./scenes/RegistrationScene')
const MainMenuScene = require('./scenes/MainMenuScene')

const bot = new Telegraf(process.env.BOT_TOKEN)

const Stage = require('telegraf/stage')
const stage = new Stage(
  [
    startScene,
      RegistrationScene,
      MainMenuScene

  ],
  {
    default: 'start_scene'
  }
)

bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())
bot.startPolling()

module.exports = bot

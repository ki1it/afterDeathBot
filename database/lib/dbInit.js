
const User = require('../models/User')
const Speech = require('../models/Speech')

User.hasMany(Speech, { foreignKey: 'User_id', sourceKey: 'Telegram_id', as: 'Speeches'  })
Speech.belongsTo(User, { foreignKey: 'User_id', targetKey: 'Telegram_id' })

async function init () {
  // await Worker.sync({force:true});
  //
  // await User.sync()
  // await Speech.sync()
  await User.sync({force:true})
  await Speech.sync({force:true})

}

(async function f () {
  await init()
})()


const User = require('../models/User')
const Speach = require('../models/Speach')

// User.hasMany(Speach, { foreignKey: 'IdGirl', sourceKey: 'User_id' })
// Speach.belongsTo(User, { foreignKey: 'IdGirl', targetKey: 'User_id' })

async function init () {
  // await Worker.sync({force:true});
  //
  await User.sync()
  await Speach.sync()
  // await User.sync({force:true})
  // await Speach.sync({force:true})

}

(async function f () {
  await init()
})()

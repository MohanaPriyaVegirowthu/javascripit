require('../db/mongoose2')
const Task = require('../models/Task')

Task.findByIdAndDelete('634f6b073ffed5ff110e7d05').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: true })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
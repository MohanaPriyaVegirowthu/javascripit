require('../db/mongoose2')
const Task = require('../models/Task')

// Task.findByIdAndDelete('634f6b073ffed5ff110e7d05').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: true })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })




const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('63520faeaa3901110b9fc2b0').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
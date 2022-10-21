require('../db/mongoose2')
const User = require('../models/User')

// User.findByIdAndUpdate('634f560d788a0748e309e6ff', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('634f560d788a0748e309e6ff', 2).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
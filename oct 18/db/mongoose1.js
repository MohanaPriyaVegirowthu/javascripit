const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-api', {
  
})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const data = new User({
//     name: 'Anitha',
//     age: 23
// })

// data.save().then(() => {
//     console.log(data)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const Task = mongoose.model('Task',{
    description:{
        type:String
    },
    completed:{
        type:Boolean
    }
})

const data1 = new Task({
    
    description: 'Clean the house',
    completed: true
})

data1.save().then(() =>{
    console.log(data1)
}).catch((error) =>{
    console.log('error',error)
})
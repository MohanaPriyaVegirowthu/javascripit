const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.pdf')) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
})
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
    
// })
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})





app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Priya@123'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('priya@123', hashedPassword)
    console.log(isMatch)
}

myFunction()


const jwt = require('jsonwebtoken')

const Function = async () => {
    const token = jwt.sign({ _id: 'dbc123' }, 'thisnodejscourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisnodejscourse')
    console.log(data)
}

Function()



const data = {
   ' name':'priya'
}
data.toJSON = function () {
    // console.log(this)
    // return this
    return {}
    
}
console.log(JSON.stringify(data))


const User = require('./models/users')
const Task = require('./models/Task')
// const main = async () => {
//     // const task = await Task.findById('6358b19d24d405d73db6e0e3')
//     // await task.populate('owner')
//     // console.log(task.owner)
//       const user = await User.findById('635766ad8262dcb2054bd8ba')
//       await user.populate('tasks')
//       console.log(user.tasks)
// } 

// main()
const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

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
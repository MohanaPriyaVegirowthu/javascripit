
const express = require('express')
const app = express()
const port = 3000

const model = require('./models/schema')
app.get('/', (req, res) => {
  res.send('Hello World!')
})
var mongoose = require('mongoose')
var url = "mongodb+srv://Mohana:priya123@cluster0.olrflh0.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      }))
  .catch((err) => console.log('err'))


  app.get('/add', (req, res) => {
    const blog = new model({
       title :'new title',
       body:'new body'
    });
    blog.save().then((result)=>{
         res.send(result)
    }).catch((err) =>{console.log(err)})
  })

app.get('/all-add',(req,res) =>{
    model.find().then((result) =>{
        res.send(result)
    }).catch(err=>{console.log('err')})
})

//if we want single find we can usee findId

// app.get('/single',(req,res) =>{
//     model.findById('').then((result) =>{
//         res.send(result)
//     }).catch(err=>{console.log('err')})
// })

 
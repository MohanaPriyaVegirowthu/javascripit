const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')

const port =  3000

app.use(express.json())

let sql

let db = new sqlite3.Database('../task.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.')
  })

app.post('/users',(req,res)=>{
    try{
        const {first_name,last_name,email,phone} =  req.body
       sql = "INSERT INTO users(first_name,last_name,email,phone) VALUES (?,?,?,?)"
       db.run(sql,[first_name,last_name,email,phone], (err)=>{
        if(err) return res.json({status:300,success:false,error:err})

        console.log("sucessful input",first_name,last_name,email,phone)
       })
    //    console.log(req.body.first_name)
       res.json({
        status:200,  
        sucess:true,
       });
    }catch(error){
        return res.json({
            status:400,
            success:false,
        })
    }
})


app.get('/users',(req,res)=>{
    sql = "SELECT * FROM users";
    try{
        db.all(sql,[],(err,rows)=>{
            if(err) res.json({status:300,success:false,error:err})


          if(rows.length<1)
          return res.json({status:300,success:false,error:'No match' })

        return res.json({status:200,data:rows,sucess:true,});
        })
    }catch(error){
        return res.json({
            status:400,
            success:false,
        })
    }
    
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
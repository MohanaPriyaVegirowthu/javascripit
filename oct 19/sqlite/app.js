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
            if(err) res.json({success:false,error:err})


          if(rows.length<1)
          return res.json({status:300,success:false,error:'No match' })

        return res.json({status:200,data:rows,sucess:true});
        })
    }catch(error){
        return res.json({
            status:400,
            success:false,
        })
    }
    
})


app.patch("/users", (req, res ) => {
    var reqBody = req.body;
    sql = "UPDATE users set  "
    let sqlLast = "WHERE id =?"
    let sqlArray = []
    let sqlNew = []
    if(reqBody.hasOwnProperty("first_name")){
        sqlArray.push(reqBody.first_name)
        // sql = sql +"first_name = ?"
        sqlNew.push( "first_name = ?")
       console.log(sqlNew)
    }
    if(reqBody.hasOwnProperty("last_name")){
        sqlArray.push(reqBody.last_name)
        // sql = sql +"last_name = ?,"
        sqlNew.push( "last_name = ?")
    }
    if(reqBody.hasOwnProperty("email")){
        sqlArray.push(reqBody.email)
        // sql = sql +"email = ?,"
        sqlNew.push( "email = ?")
    }
    if(reqBody.hasOwnProperty("phone")){
        sqlArray.push(reqBody.phone)
        // sql = sql +"phone = ?"
        sqlNew.push( "phone = ?")
    }
    sql = sql+sqlNew.join(',')
    // console.log(sqlNew.join(','))
 
    sql = sql + sqlLast
    // console.log(sql)
    sqlArray.push(reqBody.id)
    db.run(sql,
       sqlArray,
        function (err, result) {
        if (err) {
                res.status(400).json({ "error": err})
                return;
            }
            res.status(200).json({ success:true });
        });
});

// app.patch("/users", (req, res ) => {
//     var reqBody = req.body;
//     db.run(`UPDATE users set  first_name = ?  WHERE id = ?`,
//         [reqBody.first_name,reqBody.id],
//         function (err, result) {
//         if (err) {
//                 res.status(400).json({ "error": res.message })
//                 return;
//             }
//             res.status(200).json({ success:true });
//         });
// });


app.delete("/users/:id", (req, res,) => {
    db.run(`DELETE FROM users WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ sucess:true })
        });
});




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('../task.db',sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
// Create the tables



let sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name TEXT NOT NULL,last_name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,phone TEXT NOT NULL UNIQUE)`;
db.run(sql)

//Drop table
//db.run("DROP TABLE users")

//Insert the table

// let sql = `INSERT INTO users(first_name,last_name,email,phone) VALUES (?,?,?,?)`;
// db.run(sql,["ha","a","ta@gmail.com","8432"],(err) =>{
//   if(err) return console.log('err')
// })

//query the data
sql = `SELECT * FROM users`;
db.all(sql,[],(err,rows)=>{
  if(err) console.log(err)
  rows.forEach(row=>{
    console.log(row)
  })
})


// Update the data

// sql = 'UPDATE users SET first_name=? WHERE id =?';
// db.run(sql,["mike",1],(err)=>{
//   if(err) console.log("err")
// })

//delete the data
sql = 'DELETE FROM users WHERE id =?';
db.run(sql,[1],(err)=>{
  if(err) console.log("err")
})

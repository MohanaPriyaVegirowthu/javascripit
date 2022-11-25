module.exports = app =>{
const Users = require('../controllers/user_controller')
var router = require('express').Router();
const VerifyToken = require('../config/verifyToken');

 // Create Login
 router.post("/login", Users.login);

 //router.all('*', VerifyToken);

 // Create a new User
 router.post("/", Users.create);

 // Logout
 router.get("/logout", Users.logout);

 // Retrieve all Users
 router.get("/", VerifyToken, Users.findAll);

 // Get User Count
 router.get("/getUserCount", Users.getUserCount);

 // Retrieve a single User with id
 router.get("/:id", Users.findOne);


 // Update a User with id
 router.put("/:id", Users.update);



 // Delete a User with id
 router.delete("/:id", Users.delete);


 app.use('/api/Users', router);
}
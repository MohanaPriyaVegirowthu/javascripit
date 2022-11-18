module.exports = app =>{
const Users = require('../controllers/user_controller')
var router = require('express').Router();
const VerifyToken = require('../config/verifyToken');

 // Create Login
 router.post("/login", Users.login);

 // Forget Password
 router.post("/forgetPassword", Users.forgetPassword);

 // Resend OTP Code
 router.get("/resendCode/:id",  Users.resendCode);
 // Retrieve a single Responder with id

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

 // Update a User Password with id
 router.put("/updatePassword/:id", Users.updatePassword);

 // Delete a User with id
 router.delete("/:id", Users.delete);


 app.use('/api/Users', router);
}
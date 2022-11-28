const db = require("../models");
const Sequelize = require("sequelize");
const User = db.users;
const Op = Sequelize.Op;
var dbConfig = require("../config/db.config");
var encryption = require("../helpers/Encryption");
var dbConfig = require("../config/db.config");
const jwt = require("jsonwebtoken");
var encryption = require("../helpers/Encryption");


// Create and Save a new Userss
exports.create = (req, res) => {
  // Validate request 

  if (!req.body) { 
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  
  // Create a Userss
  const userVal = {
    user_name: req.body.user_name,
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    gender: req.body.gender,
    user_type: req.body.user_type,
    password: req.body.password,
  
  };
  User.create(userVal)
    .then((data) => {
		return res.status(200).send({
      status:200,
      error:false,
		  message: "User created successfully",
		});
	}).catch((err) => {
	  return res.status(200).send({
      status:204,
      error:true,
		message:
		  //err.errors[0]["message"] ||
      
		  "Some error occurred while creating the " + req.body.email,
	  });
	});
};



// Retrieve all users from the Userss.
exports.findAll = (req, res, next) => {

  User.findAll({ })
    .then((data) => {
     // console.log("--- data --- 160 ---", data)
      res.status(200).send({
        status:200,
        error:false,		    
        message: "User details fetched successfully.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(200).send({
        status:204,
        error:true,
        message:
          err.message || "Some error occurred while retrieving user.",
      });
    });
};


// Find a single users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findOne({where:{id:id}})
    .then((data) => {     
			return res.send({
        status:200,
        error:false,
        data:data});
  
	})
    .catch((err) => {
      res.status(200).send({
        status:204,
        error:true,
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const userVal = {
    mobile_no: req.body.mobile_no,
    password: req.body.password,
    user_name: req.body.user_name,
    user_type : req.body.user_type,
    gender: req.body.gender,
    email: req.body.email 
  };

  User.update(userVal, {
    where: { id: id },
  })
    .then((num) => {

      if (num[0] === 1) {
        res.send({
          status:200,
          error:false,
          message: "User updated successfully.",
        });
      } else {
        res.send({
          status:204,
          error:true,
          message: `Cannot update users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        status:204,
        error:true,
        message: "Error updating Users with id=" + id,
      });
    });
};



// Delete a users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status:200,
          error:false,
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          status:204,
          error:true,
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        status:204,
        error:true,
        message: "Could not delete User with id=" + id,
      });
    });
};

// Create a Login

// Login Controller
exports.login = (req, res) => {
  const email = encryption.encryptData(req.body.email);
  const password = encryption.encryptData(req.body.password);
;
  var incVal = {};
  if (req.body.email === undefined ) {
    res.status(200).send({
      message: "Please provide login credentials",
      data: "",
    });
    return;
  }

  if (
    (req.body.email == "")
  ) {
    res.status(200).send({
      message: "Login credentials cannot be empty",
      data: "",
    });
    return;
  }

  
    if (req.body.email !== undefined) {
      incVal = { where: { email: email, password: password } };
    }


    
  User.findOne(incVal)
    .then((data) => {    
      var userobj = {};
      userobj.userID = data.id;
      userobj.user_name = data.user_name;
      var token = jwt.sign(userobj, dbConfig.SECRET);
      // ----------- Token is generated ---------------- //
      userobj.accessToken = token;      
      loginOutput = {
        notification: {
          message: "Login successful !!",
          code: "200",
          type: "Success",
          error: false,
        },
        data: { userobj },
        
      };
  

    res.status(200).send({ loginOutput });
    })
    .catch((err) => {
  
      loginOutput = {
        notification: {
          message: "Invalid Credentials!",
          code: "404",
          type: "Failure",
          is_auth: false,
          hint: "Your account has been deactivated. Please contact your app administrator.",
          error: true,
        },
      };

      res.send({
        status: 200,
        error: true,
        message: "Invalid Credentials!",
        data: loginOutput,
      });
    
    });
};

// Logging Out
exports.logout = (req, res) => {

  req.session.user_id = "";
  req.session.user_type = "";
  req.session.destroy();
	res.send({"message": "Logout successful"});
		

};





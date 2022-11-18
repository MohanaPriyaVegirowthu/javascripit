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

  var otp =  Math.floor(1000 + Math.random() * 9000);
  var dt = new Date();
  var otp_expiry =  dt.setMinutes( dt.getMinutes() + 10 );

  // Create a Userss
  const userVal = {
    user_name: req.body.user_name,
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    gender: req.body.gender,
    user_type: req.body.user_type,
    password: req.body.password,
    status: req.body.status,
	  current_subscription: req.body.subscription_id,
	  otp: otp,
	  otp_expiry: otp_expiry,
	  otp_verified:  false,
    
   
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


// Update a users by the id in the request
exports.resendCode = (req, res) => {
  const id = req.params.id;
  var otp =  Math.floor(1000 + Math.random() * 9000);
  var dt = new Date();
  var otp_expiry =  dt.setMinutes( dt.getMinutes() + 10 );
  let jsonObject = {
	  otp: otp,
	  otp_expiry: otp_expiry
  };

  User.findOne({
    where: { id: id },
  })
    .then((data) => {
  User.update(jsonObject, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
	// SEND MAIL
	
	// SEND MAIL
        return res.send({
          status:200,
          error:false,
          message: "New OTP code sent",
	        data: jsonObject
        });
      } else {
        return res.send({
          status:204,
          error:true,
          message: `Cannot update users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      return res.status(200).send({
        status:204,
        error:true,
        message: "User not found",
      });
    });
    })
    .catch((err) => {
      return res.status(200).send({
        status:204,
        error:true,
        message: "User not found",
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

// Retrieve all Users Count
exports.getUserCount = (req, res) => {

  User.count()
    .then(function (count) {
      res.send({ status:200,
        error:false,data: count });
    })
    .catch((err) => {
      res.status(200).send({
        status:204,
        error:true,
        message:
          err.message || "Some error occurred while retrieving " + user_type,
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
    user_name: req.body.data.user_name,
    email: req.body.data.email_id,
    mobile_no: req.body.data.phone,
    gender: req.body.data.gender,
    password: req.body.data.password_main,
    current_subscription: req.body.data.subscription_id,
 
  };

  User.update(userVal, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
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

// Update a users by the id in the request
exports.updatePassword = (req, res) => {
  const id = req.params.id;
  const pwd = encryption.encryptData(req.body.password);
  let pwdVal = {
	  password: req.body.data.password_main,
  };
//, password: pwd
  User.findAll({
    where: { id: id }
  }).then((data) => {
		if(data.length) {
		  User.update(pwdVal, {
			where: { id: id },
		  })
			.then((num) => {
			  if (num == 1) {
				res.send({
				  message: "Password updated successfully",
				});
			  } else {
				res.send({
				  message: `Cannot update password with id=${id}. Maybe User was not found or req.body is empty!`,
				});
			  }
			})
			.catch((err) => {
			  res.status(200).send({
				message: "Error updating Password with id=" + id,
			  });
			});
		} else {
			res.send({
			  message: `Incorrect current password`,
			});
		}
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving Patients.",
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
  const mobile_no = encryption.encryptData(req.body.phone);
  const user_type = encryption.encryptData(req.body.role);
  //console.log("email", encryption.decryptData(email));
  const timezone = req.body.timezone;
  //const timezone = 'Asia/Kolkata';
  //  return;
  var incVal = {};
  if (req.body.email === undefined && req.body.phone === undefined) {
    res.status(200).send({
      message: "Please provide login credentials",
      data: "",
    });
    return;
  }

  if (
    (req.body.email !== undefined && req.body.email == "") ||
    (req.body.phone !== undefined && req.body.phone == "")
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
    if (req.body.phone !== undefined) {
      incVal = { where: { mobile_number: mobile_no, password: password } };
    }

  User.findOne(incVal)
    .then((data) => {
   
      var randomNumber = Math.floor(1000 + Math.random() * 9000);
      var userobj = {};
      userobj.userID = data.id;
      //userobj.email = data.email;
      userobj.name = data.name;
      //userobj.mobile_number = data.mobile_number;
      userobj.user_type = data.user_type;


      var token = jwt.sign(userobj, dbConfig.SECRET);

      userobj.selected_language = data.selected_language;
      // ----------- Token is generated ---------------- //
      userobj.accessToken = token;   

     
      let jsonObject = {    
        token:token      
      };
      // End Token Expair changes by 21-04-2021
      User.update(jsonObject, { where: { id: data.id }})
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

// Forget Password
exports.forgetPassword = (req, res) => {
  // Create a Doctor
  const loginVal = {
    email: encryption.encryptData(req.body.email),
  };
  var randonmnumber =  Math.floor(1000 + Math.random() * 9000);
  var dt = new Date();
  var newtime =  dt.setMinutes( dt.getMinutes() + 10 );
  User.findAll({ where: loginVal })
    .then((userData) => {
      if (userData.length) {
      var updateotp = {
         otp: randonmnumber,
         otp_expiry :newtime
      }
      User.update(updateotp, {
        where: {id: userData[0].dataValues.id},
       }).then((num) => {
          if(num == 1) {
             User.findAll({ where: {id: userData[0].dataValues.id} }) .then((userData1) => {
            if (userData1.length) {
              // SEND MAIL
            
	     // SEND MAIL
             loginOutput = {
                notification: {
                  message: "Success",
                  code: "200",
                  type: "Success",
                  is_auth: true,
                  hint: "Response Sent",
                },
                data: {
                  email: userData1[0].email,
                  userID: userData1[0].id,
                  otp: userData1[0].dataValues.otp,
                  otpexpiry: new Date(userData1[0].dataValues.otp_expiry).toString('YYYY-MM-dd'),
                },
              };
              res.send(loginOutput);
            } else {
              loginOutput = {
                notification: {
                  message: "Failure",
                  code: "404",
                  type: "Failure",
                  is_auth: false,
                  hint: "User record not found",
                },
                data: {},
              };
              res.send(loginOutput);
            }
          })
          }
        }) .catch((err) => {
          console.log(err)
          res.status(200).send({
            message:
              err.message ||
              "Some error occurred while retrieving user information.",
          });
        });
      }  
    })
    .catch((err) => {
      res.status(200).send({
        message:
          err.message ||
          "Some error occurred while retrieving user information.",
      });
    });
};





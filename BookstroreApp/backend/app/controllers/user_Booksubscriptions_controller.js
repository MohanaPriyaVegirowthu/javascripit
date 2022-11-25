const db = require("../models");
const UserBooksubscriptiontbl = db.usersBookScriptiontbl;
const User = db.users;
const BookStoretbl = db.bookStoretbl

exports.create = (req, res) => {
 if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  } else {
  UserBooksubscriptiontbl.create(req.body)
          .then((data) => {
                  res.status(200).send({
                    status: 200,
                    error: false,
                    message: "User Book subscriptions is created successfully.",
                    data:data
                  });
                
          })
          .catch((err) => {
            res.status(500).send({
              status:500, error:true,
              message:
                    err.message || "Some error occurred while retrieving Users.",
            });
          });
  
 
  }
};
// Retrieve all Users
exports.findAll = (req, res, next) => {
  User.hasMany(UserBooksubscriptiontbl, { foreignKey: "user_id" });
  UserBooksubscriptiontbl.belongsTo(User, { foreignKey: "user_id" });
  BookStoretbl.findAll(UserBooksubscriptiontbl, {foreignKey:"book_id"});
  UserBooksubscriptiontbl.belongsTo(BookStoretbl, { foreignKey: "book_id" });
  UserBooksubscriptiontbl.findAll({
      include: [         
        {
          model: User,
          required: true,
          attributes: [ "id", "user_name", "email" ],
        },
        {
          model: BookStoretbl,
          required: true,
          attributes: [ "id", "bookname"],
        },
      ],
        attributes: {
          exclude: ["createAt","updatedAt"],
        }
      })
    .then((data) => {
      //console.log(data);
      res.send({    status: 200,
        error: false,
        message: "User Book subscriptions is fetch successfully.",
        data:data});
    })
    .catch((err) => {
      res.status(500).send({status:500, error:true,
        message:
          err.message || "Some error occurred while retrieving Patient List.",
      });
    });
};

// Find a single users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  UserBooksubscriptiontbl.findOne({where:{id:id}})
    .then((data) => {
      res.send({    status: 200,
        error: false,
        message: "User Book subscriptions is fetch successfully.",
        data:data});
    })
    .catch((err) => {
      res.status(500).send({status:500, error:true,
        message: "Error retrieving User with id=" + id,
      });
    });
};
// Update a users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const UserBooksubscriptiontblVal = {
    user_id : req.body.user_id,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    book_id: req.body.book_id, 
    status: 1,
  };
  UserBooksubscriptiontbl.update(UserBooksubscriptiontblVal, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status:200, error:false,
          message: "UserBooksubscription updated successfully.",
        });
      } else {
        res.send({
          status:204, error:true,
          message: `Cannot update UserBooksubscription with id=${id}. Maybe UserBooksubscription was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        status:204, error:true,
        message: "Error updating Users with id=" + id,
      });
    });
};

// Delete a users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  UserBooksubscriptiontbl.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status:200, error:false,
          message: "UserBooksubscription was deleted successfully!",
        });
      } else {
        res.send({
          status:204, error:true,
          message: `Cannot delete UserBooksubscription with id=${id}. Maybe UserBooksubscription was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        status:204, error:true,
        message: "Could not delete UserBooksubscription with id=" + id,
      });
    });
};

// Retrieve all Users Count
exports.getSubscriptionCount = (req, res) => {
  UserBooksubscriptiontbl.count()
    .then(function (count) {
      res.send({ 
        status: 200,
        error: false,
        message: "User Book subscriptions count is fetch successfully.",       
        data: count });
    })
    .catch((err) => {
      res.status(200).send({status:204, error:true,
        message:
          err.message || "Some error occurred while retrieving " + user_type,
      });
    });
};


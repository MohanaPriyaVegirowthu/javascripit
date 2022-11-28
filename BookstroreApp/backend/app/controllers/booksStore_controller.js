const db = require("../models");
const Sequelize = require("sequelize");
const BooksStoretbl = db.bookStoretbl;
const BookAuthortbl = db.booksAuthorstbl
exports.create = (req, res) => {
   if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  } else {  
    BooksStoretbl.create(req.body)
          .then((data) => {
            if(req.body.authorname.length > 0)
            {
              req.body.authorname.map(item=>{
              let bookAuthordata = {
                book_id : data.id,
                authorname : item,
                status:1
              }
              BookAuthortbl.create(bookAuthordata);
              })
            }
            res.status(200).send({
                    status: 200,
                    error: false,
                    message: "Book is created successfully.",
                    data:data                    
                  });
                
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Users.",
            });
            console.log("------",err.message);
          });
  
 
  }
};

// Retrieve all Users
exports.findAll = (req, res, next) => {
    var sortType = ["id", "DESC"];
    BooksStoretbl.findAll({     
        attributes: {
            exclude: ["updatedAt"],
          },
          order: [sortType]
        })
    .then((data) => {
    res.send({status:200, error:false, message:"Books is fetch Successfully",data:data});
    })
    .catch((err) => {
      res.status(500).send({
        status:500, error:true,
        message:
          err.message || "Some error occurred while retrieving Patient List.",
      });
    });
};

// Find a single users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BooksStoretbl.findOne({where:{id:id}})
    .then((data) => {
      res.send({status:200, error:false, message:"Book is fetch Successfully",data:data});
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};
// Update a users by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const BooksVal = {
    bookname : req.body.bookname,
    author: req.body.author, 
    price: req.body.price,
    status: 1,
  };
  BooksStoretbl.update(BooksVal, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send(
        {status:200, error:false, message:"Book is updated successfully."}
        );
      } else {
        res.send({
          message: `Cannot update Books with id=${id}. Maybe Book was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: "Error updating Users with id=" + id,
      });
    });
};

// Delete a users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  BooksStoretbl.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
            status:200, error:false,
          message: "Book was deleted successfully!",
        });
      } else {
        res.send({status:204, error:true,
          message: `Cannot delete book with id=${id}. Maybe book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(200).send({
        message: "Could not delete book with id=" + id,
      });
    });
};

exports.updateuserstatus = (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    var userStatus = {status:1}
    if(status === "true")
    {
       userStatus = {
        status:0
      };
    }  
    BooksStoretbl.update(userStatus, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Books status is updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Books with id=${id}. Maybe Books  was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          console.log(err.errors[0]["message"]);
          res.status(200).send({
            message: "Error updating Users with id=" + id,
          });
        });
    };



//var encryption = require("../helpers/Encryption");
module.exports = (sequelize, Sequelize) => {
  const tbl_books_store = sequelize.define(
    "books_store",
    {     
      bookname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isbn: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shelf : {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      row : {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      count : {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },      
     
     
    },
    
  );
  return tbl_books_store;
};

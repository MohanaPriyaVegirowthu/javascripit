//var encryption = require("../helpers/Encryption");
module.exports = (sequelize, Sequelize) => {
  const books_authornames = sequelize.define(
    "books_authorname",
    {     
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },      
      authorname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      
      status:{
        allowNull:true,
        type:Sequelize.STRING
      }
     
    },
    
  );
  return books_authornames;
};

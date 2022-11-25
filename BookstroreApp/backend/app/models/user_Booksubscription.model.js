//var encryption = require("../helpers/Encryption");
module.exports = (sequelize, Sequelize) => {
  const user_booksubscription_tbl = sequelize.define(
    "user_booksubscription",
    {
        user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fromDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      toDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status:{
        allowNull:false,
        type: Sequelize.BOOLEAN,
        defaultValue:1
      }   
    },    
  );
  return user_booksubscription_tbl;
};

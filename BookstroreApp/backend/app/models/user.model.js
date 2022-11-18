var encryption = require("../helpers/Encryption");
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    "users",
    {
      user_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
	  mobile_no: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      current_subscription: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue:1
      },
      registration_type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    
      otp :{
        allowNull:true,
        type: Sequelize.STRING(4)
      },
      otp_expiry: {
        allowNull:true,
        type: Sequelize.DATE
      },
      token: {
        allowNull:true,
        type: Sequelize.STRING,
      }
    },

    {
      getterMethods: {
        email: function () {
          return encryption.decryptData(this.getDataValue("email"));
        },
        mobile_no: function () {
          return encryption.decryptData(this.getDataValue("mobile_no"));
        },
        password: function () {
          return encryption.decryptData(this.getDataValue("password"));
        },
       
      },
      setterMethods: {
        email: function (value) {
          this.setDataValue("email", encryption.encryptData(value));
        },
        mobile_no: function (value) {
          this.setDataValue("mobile_no", encryption.encryptData(value));
        },
        password: function (value) {
          this.setDataValue("password", encryption.encryptData(value));
        },
       
      },
    }
    
  );

  return users;
};

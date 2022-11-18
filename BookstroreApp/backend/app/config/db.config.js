module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "BookStoredb",
    dialect: "mysql",
    SECRET: "ADVDR#9II",
	  timezone: 'Asia/Kolkata',
  	timeOffset: 330,
    pool: {
      max: 15,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    encryptionKey:
      "NT9N9OuItINx6v8HTgBcuICZxoIpQQCUCHsjdrOAZerRLwrkDDAC1sGne6DBezv",
  };
  
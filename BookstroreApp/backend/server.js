 const express = require("express");
const bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
// global.session;
var session;
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const db = require("./app/models");
db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cloud 911 application." });
});
require("./app/routes/user_routes")(app);
require("./app/routes/booksStore_routes")(app);
require("./app/routes/user_booksubscription_routes")(app);

app.use('/logout', function(req, res, next) {
 req.session.user_id = "";
  req.session.user_type = "";
 req.session.destroy();
  res.redirect(302, '/');
});
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
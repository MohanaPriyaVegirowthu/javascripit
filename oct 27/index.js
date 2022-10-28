var nodemailer = require('nodemailer');
const express = require('express')
const path = require('path')
const multer = require('multer')
const CLIENT_ID = "761130574918-u36kcqbvkuk6f538nt68q9d528tkq0ks.apps.googleusercontent.com";
const CLEINT_SECRET ="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";

let paths = []
const app = express()

app.use(express.static(path.join(__dirname +'public/upload')))

 
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "public/upload");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
 
var upload = multer({
    storage: Storage
}).array('file', 10)
 
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})
 
app.post('/sendemail',(req,res) => {
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            console.log(req.files)  
            req.files.forEach(file => {
                paths.push({
                    filename :Date.now() + "file" +path.extname(file.originalname),
                    path: file.path
                })
            });
            // console.log(paths)
            sendMail(paths)
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));  
          }
      })
  })
   
  app.listen(5000,() => {
      console.log("App started on Port 5000")


  })

  async function sendMail(paths) {
    try {
      
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'mohana.priya@deeplogictech.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          accessToken: "ya29.a0Aa4xrXO6tKnQ7hx5yyJx7SiRZ9MI-rQsgoRUI6EvYLG4PlKc_kQeencuWIKgIwoNn9stpoKbqi_nMVQ8waHxTv5QltG8xD5G0SPPaEqLyDcDXSIsbHM8tgAREahyIrxtSTQrRhhX0xN-tsJCdojyIKUr6kavaCgYKATASARMSFQEjDvL9lIDQ1P_TD3l1sZHxLfxDng0163",
        },
      });
   
      const mailOptions = {
        from: 'mohana.priya@deeplogictech.com',
        to: 'priya.vegirowthu@gmail.com',
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1><br><p>This is img</p><img src="#">',
        attachments:paths
      };
   
      const result = await transport.sendMail(mailOptions);
      return result;
  } catch (error) {
    return error;
  }
  }
  
  
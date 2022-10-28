const nodemailer = require('nodemailer');

const CLIENT_ID = "761130574918-u36kcqbvkuk6f538nt68q9d528tkq0ks.apps.googleusercontent.com";
const CLEINT_SECRET ="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";
 
async function sendMail() {
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
      attachments:[
        {
            filename:"file.txt",
            content:"this is text file"
        },
        {
            filename:"image.png",
            path :"url"
            // url is path of image 
        },
      ]
    };
 
    const result = await transport.sendMail(mailOptions);
    return result;
} catch (error) {
  return error;
}
}

sendMail()
.then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));
var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 4500;

    app.get('/', function (req, res) {
      res.render('index');
    });

    // app.post('/index', function (req, res) {
    //     res.render('index');
    //   });

      app.get('/login', function (req, res) {
        res.render('log');
      });

      // app.post('/success', function (req, res) {
      //   res.render('success');
      // });



    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'prnjl39@gmail.com',
              pass: 'ghyzfbrhubxgxjrc'
          }
      });
      let mailOptions = {
          from: '"PJ The Mailer" <xx@gmail.com>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          // html: '<b><a>Click Here to verify your Email</a></b>'
          html: '<p><a href="http://localhost:'+port+'/login">Click Here</a> To Log In</p>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
          

          const session = require("express-session");
          const cookieParser = require("cookie-parser");
          const sessionStorage = require('sessionstorage-for-nodejs');


app.use(cookieParser());
app.use(session({ secret: "pj1234", saveUninitialized: true, resave: true }));

const user = {
    name: "pj"
};

console.log(process.env);
app.post("/success", (req, res) => {
    req.session.user = user;
    req.session.save();
    sessionStorage.setItem('name','demon');
    return res.set({
        'Content-Type': 'text/html'
     }).send(user.name+'  <br><br><br>Logged in <br> Click here to <a href="http://localhost:'+port+'/logout">Sign Out</a>');
});

app.get("/user", (req, res) => {
    const sessionUser = req.session.user;
    return res.send(sessionUser);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    sessionStorage.clear();
    return res.send("User logged out!");
});

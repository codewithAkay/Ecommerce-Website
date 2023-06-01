const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const dotenv=require("dotenv");
const flash = require('connect-flash');

const session = require('express-session');

require("./models/connection.js")


const app = express();


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
     
    }));
app.use(passport.initialize());
app.use(passport.session());

  app.use(flash());
  app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));;
app.use("/",require("./routes/web.js"))
app.use("/create",async(req,res)=>{
  const hash=await bcrypt.hash("12345",10)
const data=new Login.create({
  email:"admin@admin.com",
  password:hash
})
res.status(200).send("Created SuccessFully")
})


dotenv.config();







app.listen(process.env.PORT  ||7000, () => {
    console.log("Backend server is running");
  });
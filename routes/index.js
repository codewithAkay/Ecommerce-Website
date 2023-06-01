const express = require ('express');
const bodyParser = require('body-parser');
const db = require("../models/connection")
const Product=db.product
const Register=db.register

const router =express.Router();

router.get('/', (req,res)=>res.render('welcome'));
router.get('/dashboard', (req,res)=>res.render('dashboard'));
router.get("/cart/add" ,async(req , res ) =>{
  const product=await Register.findAll({})
  res.render ('register',{product:product})})
router.get("/cartdetails" ,  (req , res ) =>res.render ('register'))
router.get('/cart' ,async(req , res ) =>
{
   res.render("register")
})
router.get('/cart/:id' ,async(req , res ) =>
{
   const {id}=req.params
   const products=await Product.findAll({where:{id}})
   const data=await Register.create({
    name:products[0].name,
    category:products[0].category,
    price:products[0].price,
    image:products[0].image 
   })

   const product=await Register.findAll({})
   res.render("register",{ product:product})
})

router.get("/deleteItem/:id",async(req,res)=>{
  const {id}=req.params
  const data =await Register.destroy({where:{id}})
  const product=await Register.findAll({})
   res.status(200).render("register",{ product:product})
})




const cookieSession = require('cookie-session');

const session = require('express-session');

const app = express();

app.use(session({
  secret: 'my-secret-key', // Replace with a secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.post('/cart/add', (req, res) => {
  const { name, price } = req.body;
  const cart = req.session.cart || [];

  cart.push({ name, price });
  req.session.cart = cart;

  res.json({ message: 'Item added to cart' });
});











module.exports = router;
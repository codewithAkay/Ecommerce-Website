const express=require("express")
const db = require("../models/connection")
const Login=db.login
const Product=db.product
const fs = require("fs");
const router=express.Router()
;const bcrypt=require("bcryptjs")
const multer = require("multer");



router.get("/create", async(req,res)=>{
    const hash=await bcrypt.hash("12345",10)
  const data=await Login.create({
    email:"admin@admin.com",
    password:hash
  })
  res.status(200).send("Created SuccessFully")
  })
router.post("/authLogin",async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Retrieve admin from database
        const admin = await Login.findOne({ where: { email } });
        // Check if admin exists
        if (!admin) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid  password' });
        }      
        res.status(200).render('dashboard');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

router.post('/addProduct', async(req, res)=> {
  upload(req, res,  async(err)=> {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
   
    const {name,category,price}=req.body
    const image=req.file
    const data=await Product.create({
       name:name,
       category:category,
       price:price,
       image:image.path
    })
    res.status(200).render("dashboard")
});
});

router.get("/fetchData",async(req,res)=>{
    const data=await Product.findAll({})
    res.status(200).send(data)
})

router.post("/delete/:id",async(req,res)=>{
  const {id}=req.params
  const data=await Product.destroy({where:{id}})
  res.status(200).render("dashboard")
})
 
  module.exports=router
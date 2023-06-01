// MONGODB DATABSE



const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model


const db = require('../models/connection');
const { Mongoose } = require('mongoose');
const Products=db.product
const Login=db.login
// Login Page
router.get('/login',  (req, res) => res.render('login'));


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});




module.exports = router;
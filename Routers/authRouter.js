const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');
router.use(session({
  secret: "egcorsecret",
  resave: false,
  saveUninitialized: true
}));
router.get('/auth', (req, res) => {
  res.render('Auth');
});
router.post('/register-user',(req, res, next) => {
  console.log(req.body);
  next();
}, async (req, res) => {
  if (req.body.captcha !== req.session.captcha) {
    return res.send("wrong captcha");
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const hashedConfirmPassword = await bcrypt.hash(req.body.confirmpassword, salt);
  const user = new User({
    fullname: {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    },
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    gender: req.body.gender,
    qualification: req.body.qualification,
    password: hashedPassword,
    confirmpassword: hashedConfirmPassword,
    role: 'user'
  });
  await user.save();
  res.send("User registered successfully");
});
router.post('/login', async (req, res) => {
  const { username, email, password, captcha } = req.body;
  if (captcha !== req.session.captcha) {
    return res.send("wrong captcha");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.send("Invalid email or password");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.send("Invalid email or password");
  }
  res.send("Login successful");
});

module.exports = router
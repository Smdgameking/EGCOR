const express = require('express')
const router = express.Router();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');
router.use(session({
  secret: "egcorsecret",
  resave: false,
  saveUninitialized: true
}));
router.get('/auth', (req, res) => {
  res.render('create-user');
});
router.post('/register-user', async (req, res) => {
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
    confirmpassword: hashedConfirmPassword
  });
  await user.save();
  res.send("User registered successfully");
});
router.post('/login', async (req, res) => {
  const { username, email, password, captcha } = req.body;
  if (captcha !== req.session.captcha) {
    return res.send("wrong captcha");
  }
});

module.exports = router
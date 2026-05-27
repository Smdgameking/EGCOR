const express = require('express');
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
  res.render('Auth', {
    activeTab: req.query.tab || 'login',
    alertMessage: req.query.message || '',
    alertType: req.query.type || 'error'
  });
});

router.post('/register-user',(req, res, next) => {
  console.log(req.body);
  next();
}, async (req, res) => {
  if (req.body.captcha !== req.session.captcha) {
    return res.redirect('/auth?tab=register&message=Captcha%20is%20incorrect&type=error');
  }
  const passwd = req.body.password;
  let strength = 0
  if(/[A-Z]/.test(passwd)){
    strength++;
  }

  if(/[0-9]/.test(passwd)){
    strength++;
  }
  if(/[a-z]/.test(passwd)){
    strength++;
  }
  if(/[@$!%*?&]/.test(passwd)){
    strength++;
  }
  if(strength < 3){
    return res.redirect('/auth?tab=register&message=Password%20must%20meet%20requirements&type=error');
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
  req.session.user = {
    id: user._id,
    username: user.fullname.firstname + " " + user.fullname.lastname,
    role: user.role
  };
  res.redirect('/dashboard');
});
router.post('/login', async (req, res) => {
  const { email, password, captcha } = req.body;
  if (captcha !== req.session.captcha) {
    return res.redirect('/auth?tab=login&message=Invalid%20captcha&type=error');
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.redirect('/auth?tab=register&message=User%20does%20not%20exist.%20Please%20register.&type=warning');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.redirect('/auth?tab=login&message=Incorrect%20password&type=error');
  }

  req.session.user = {
    id: user._id,
    username: user.fullname.firstname + " " + user.fullname.lastname,
    role: user.role
  };

  if(user.role === 'admin'){
    return res.redirect('/admin/dashboard');
  }
  res.redirect('/dashboard');
});

module.exports = router
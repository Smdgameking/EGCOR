const express = require('express')
const router = express.Router();
const svgcaptcha = require('svg-captcha');
const session = require('express-session');
router.use(session({
  secret: "egcorsecret",
  resave: false,
  saveUninitialized: true
}));

router.get('/captcha', (req,res)=>{
  const captcha = svgcaptcha.create({
    size: 5,
    noise: 3,
    color: true,
    ignoreChars: "0Oo1ilI",
    charPreset: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
})

module.exports = router
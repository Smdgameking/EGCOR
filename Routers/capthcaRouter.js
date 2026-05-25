const express = require('express');
const router = express.Router();
const svgcaptcha = require('svg-captcha');

router.get('/captcha', (req,res)=>{
  const captcha = svgcaptcha.create({
    size: 4,
    noise: 10,
    color: true,
    ignoreChars: "0Oo1ilI",
    charPreset: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
})

module.exports = router
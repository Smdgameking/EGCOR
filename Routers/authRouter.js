const express = require('express')
const router = express.Router();
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
  const { username, email, password, confirmpassword , captcha} = req.body;
  if(captcha !== req.session.captcha ){
    return res.send("wrong captcha");
  }
  try {
    await User.create({ username, email, password });
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});
router.post('/login-user', async ()=>{
  const { username, email, password , captcha} = req.body;
  if(captcha !== req.session.captcha ){
    return res.send("wrong captcha");
  }
})

module.exports = router
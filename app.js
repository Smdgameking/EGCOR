const express = require('express');
const app = express();
const connectDB = require('./mongodb/db');
const User = require('./models/User');
const authRout = require("./Routers/authRouter");
const captchaRout = require("./Routers/capthcaRouter");
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
connectDB();

app.use(authRout);
app.use(captchaRout)
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000,"0.0.0.0", () => {
  console.log('Server is running on port 3000');
});
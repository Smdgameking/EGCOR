const express = require('express');
const app = express();
const connectDB = require('./mongodb/db');
const User = require('./models/User');
const authRout = require("./Routers/authRouter");
const captchaRout = require("./Routers/capthcaRouter");
const dashboardRout = require("./Routers/dashboardRouter");
const applicationRout = require("./Routers/applicationRouter");
const AdminDashboard = require("./Routers/AdminDashboard");
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
   '/uploads',
   express.static('uploads')
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
connectDB();

app.use(authRout);
app.use(captchaRout);
app.use(dashboardRout);
app.use(applicationRout);
app.use('/admin', AdminDashboard);
app.get('/', (req, res) => {
  res.redirect('dashboard')
});
app.listen(3000,"0.0.0.0", () => {
  console.log('Server is running on port 3000');
});
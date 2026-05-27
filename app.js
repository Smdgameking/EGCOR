const express = require('express');
const session = require('express-session');
const app = express();
const connectDB = require('./mongodb/db');
const User = require('./models/User');
const authRout = require("./Routers/authRouter");
const captchaRout = require("./Routers/capthcaRouter");
const dashboardRout = require("./Routers/dashboardRouter");
const applicationRout = require("./Routers/applicationRouter");
const AdminDashboard = require("./Routers/AdminDashboard");
const apiV1Router = require('./Routers/api/v1');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
   '/uploads',
   express.static('uploads')
);

app.use(session({
  secret: process.env.SESSION_SECRET || 'egcorsecret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
connectDB();

app.use('/api/v1', apiV1Router);
app.use(authRout);
app.use(captchaRout);
app.use(dashboardRout);
app.use(applicationRout);
app.use('/admin', AdminDashboard);
app.get('/', (req, res) => {
  res.redirect('dashboard');
});

app.use((req, res) => {
  res.status(404).render('ErrorPage', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    details: 'Please check the URL or return to the dashboard.',
    backUrl: req.get('referer') || '/'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('ErrorPage', {
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred while handling your request.',
    details: err.message || 'Unknown server error. Please try again later.',
    backUrl: req.get('referer') || '/'
  });
});



app.listen(3000,"0.0.0.0", () => {
  console.log('Server is running on port 3000');
});
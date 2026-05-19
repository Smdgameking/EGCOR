const express = require('express');
const app = express();
const connectDB = require('./mongodb/db');
const User = require('./models/User');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/create-user', (req, res) => {
  res.render('create-user');
});
app.post('/create-user', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
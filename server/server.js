require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect')
const initRoutes = require('./routes/index')
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8081;

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

initRoutes(app);

app.listen(port, () => {
    console.log('Server is running on port ', port);
})  
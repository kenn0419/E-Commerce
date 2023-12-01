require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect')
const initRoutes = require('./routes/index')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

initRoutes(app);

app.listen(port, () => {
    console.log('Server is running on port ', port);
})  
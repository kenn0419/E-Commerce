require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => res.send('Test server'));

app.listen(port, () => {
    console.log('Server is running on port ', port);
})
//DOTENV SETUP
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 5555
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/api',router);
//Start listening
app.listen(PORT, ()=> "Server Listening on Port 5555!");
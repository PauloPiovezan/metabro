const express = require('express');
const services = require('./services');

const router = express.Router();

//LOGIN HANDLER
router.post('/login',services.handleLogin);

//SALES HANDLER
router.get('/sales',services.getSales);

//GOALS HANDLER
router.get('/goals',services.getGoal);
router.post('/goals',services.setGoal);


module.exports = router;



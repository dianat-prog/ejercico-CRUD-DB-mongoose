const express =require('express');
const router=express.Router();
const taskRoutes = require('./tasks');

router.use('/',taskRoutes);

module.exports = router;
const router = require('express').Router();
const noteRoutes = require('./noteRoute');
router.use('/notes',noteRoutes)


module.exports=router


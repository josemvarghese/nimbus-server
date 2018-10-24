
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const complaint = require('./complaint');
const comment = require('./comment');
const passportConfig = require('../../config/passport');

router.use('/auth',auth);
router.use('/complaint',passportConfig.jwtauth,complaint);
router.use('/comment', passportConfig.jwtauth, comment);

module.exports = router;

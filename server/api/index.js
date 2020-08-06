const express = require('express');
const router = express.Router();
const recordRouter = require('./routes/record');
const recordReloadRouter = require('./routes/record-reload');
const userRouter = require('./routes/user.js');

router.use('/user', userRouter);
router.use('/record', recordRouter);
router.use('/record-reload', recordReloadRouter);

module.exports = router;

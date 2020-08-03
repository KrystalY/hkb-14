const express = require('express');
const router = express.Router();
const recordRouter = require('./routes/record');
const recordReloadRouter = require('./routes/record-reload');

router.use('/record', recordRouter);
router.use('/record-reload', recordReloadRouter);

module.exports = router;

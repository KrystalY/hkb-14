const express = require('express');
const router = express.Router();
const recordRouter = require('./routes/record');

router.use('/record', recordRouter);

module.exports = router;

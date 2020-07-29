const express = require('express');
const router = express.Router();

router.use('/', async function (req, res, next) {
  console.log('record');
});

module.exports = router;

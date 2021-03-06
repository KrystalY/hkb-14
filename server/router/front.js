const express = require('express');
const router = express.Router();

const renderFile = (req, res, next) => {
  res.render('index.html');
};

router.get('/', renderFile);
router.get('/login(/*)?', renderFile);
router.get('/record(/*)?', renderFile);
router.get('/calendar(/*)?', renderFile);
router.get('/statistics(/*)?', renderFile);

module.exports = router;

const express = require('express');
const router = express.Router();
import { FindByYearAndMonth } from '@service/record';

router.use('/:year/:month', async function (req, res, next) {
  const record = await FindByYearAndMonth(req.params.year, req.params.month);
  res.json(record);
});

module.exports = router;

const express = require('express');
const router = express.Router();
import { findByYearAndMonth } from '@service/record';
import { wrapAsync } from '../../util';

router.use(
  '/:year/:month',
  wrapAsync(async function (req, res, next) {
    const year = req.params.year;
    const month = req.params.month;
    const items = await findByYearAndMonth(year, month);
    res.send({ success: true, items, year, month });
  }),
);

module.exports = router;

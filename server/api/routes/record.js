const express = require('express');
const router = express.Router();
import { findByYearAndMonth, getRecentUpdatedDate } from '@service/record';
import { wrapAsync } from '../../util';

router.use(
  '/:year/:month/:lastEditedAt',
  wrapAsync(async function (req, res, next) {
    const year = req.params.year;
    const month = req.params.month;
    const lastEditedAt = req.params.lastEditedAt;
    const lastUpdate = await getRecentUpdatedDate(year, month);
    const items = await findByYearAndMonth(year, month);
    const isReload = Date.parse(lastUpdate) > Date.parse(lastEditedAt);

    res.send({ success: true, items, year, month, isReload });
  }),
);

module.exports = router;

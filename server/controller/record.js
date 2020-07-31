import { findByYearAndMonth, getRecentUpdatedDate } from '@service/record';

const getRecordInMonth = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  const lastEditedAt = req.params.lastEditedAt;
  const lastUpdate = await getRecentUpdatedDate(year, month);
  const items = await findByYearAndMonth(year, month);
  const isReload =
    lastUpdate.length === 0 || !lastEditedAt
      ? false
      : Date.parse(lastUpdate) > Date.parse(lastEditedAt);

  res.send({
    success: true,
    items,
    year,
    month,
    isReload,
  });
};

export { getRecordInMonth };

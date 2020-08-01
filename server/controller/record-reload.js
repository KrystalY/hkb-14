import { getRecentUpdatedDate } from '@service/record';

const isReloadInMonth = async function (req, res, next) {
  console.log(req.query);
  const year = req.params.year;
  const month = req.params.month;
  const lastEditedAt = req.query.lastEditedAt;
  const lastUpdate = await getRecentUpdatedDate(year, month);
  const isReload =
    lastUpdate.length === 0 || !lastEditedAt
      ? false
      : Date.parse(lastUpdate) > Date.parse(lastEditedAt);
  res.send({
    success: true,
    isReload,
  });
};

export { isReloadInMonth };

import { findByYearAndMonth } from '@service/record';

const getRecordInMonth = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  const items = await findByYearAndMonth(year, month);

  res.send({
    success: true,
    year,
    month,
    items,
  });
};

export { getRecordInMonth };

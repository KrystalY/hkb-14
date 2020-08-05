import { findByYearAndMonth, createRecord } from '@service/record';

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

const createRecordFromInput = async function (req, res, next) {
  const body = req.body;
  const userKey = body.user;
  const amount = body.amount;
  const categoryKey = body.category;
  const content = body.content;
  const paymentMethodKey = body.payment_method;
  const recordAt = body.record_at;
  const data = {
    userKey,
    amount,
    categoryKey,
    content,
    paymentMethodKey,
    recordAt,
  };

  const result = await createRecord(data);
  res.send({
    success: true,
  });
};

export { getRecordInMonth, createRecordFromInput };

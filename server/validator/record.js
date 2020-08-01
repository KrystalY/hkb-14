import { parseISO, isValid } from 'date-fns';

const validateRecordParameter = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  const lastEditedAt = req.query.lastEditedAt;
  let [isError, message] = validateYear(year);
  if (isError) {
    res
      .status(400)
      .json({
        message,
      })
      .end();
    return;
  }
  [isError, message] = validateMonth(month);
  if (isError) {
    res
      .status(400)
      .json({
        message,
      })
      .end();
    return;
  }
  [isError, message] = validateDate(lastEditedAt);
  next();
  if (isError) {
    res
      .status(400)
      .json({
        message,
      })
      .end();
    return;
  }
};

const validateYear = function (year) {
  if (isNaN(year)) {
    return [true, 'year is must be number'];
  }
  if (year < 1900 || year > new Date().getFullYear() || year.length < 4) {
    return [true, 'year is out of range'];
  }
  return [false];
};

const validateMonth = function (month) {
  if (isNaN(month)) {
    return [true, 'month is must be number'];
  }
  if (month < 1 || month > 12) {
    return [true, 'month is out of range'];
  }
  return [false];
};

const validateDate = function (date) {
  const dateRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
  if (!dateRegex.test(date)) {
    return [true, 'invalid Date Format'];
  }
  if (!isValid(parseISO(date))) {
    return [true, 'invalid Date'];
  }

  return [false];
};

export { validateRecordParameter };

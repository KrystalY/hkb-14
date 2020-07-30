import moment from 'moment';

const validateRecordParameter = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
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
  next();
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

export {
  validateRecordParameter
};
import { parseISO, isValid } from 'date-fns';

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

const sendResponseMessage = function (res, message) {
  res
    .status(400)
    .json({
      message,
    })
    .end();
};

export { validateYear, validateMonth, validateDate, sendResponseMessage };

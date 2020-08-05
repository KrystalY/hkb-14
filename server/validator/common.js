import { parseISO, isValid } from 'date-fns';

const validateNumber = function (value, { min = null, max = null }) {
  if (isNaN(value)) {
    return [true, 'value is must be number'];
  }
  if ((min != null && value < min) || (max != null && value > max)) {
    return [true, 'value is out of range'];
  }
  return [false];
};

const validateYear = function (year) {
  if (isNaN(year)) {
    return [true, 'year is must be number'];
  }
  if (year < 1900 || year > new Date().getFullYear() + 30 || year.length < 4) {
    return [true, 'year is out of range'];
  }
  return [false];
};

const validateMonth = function (month) {
  return validateNumber(month, { min: 1, max: 12 });
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

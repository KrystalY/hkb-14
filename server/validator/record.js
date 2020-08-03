import {
  validateYear,
  validateMonth,
  validateDate,
  sendResponseMessage,
} from './common';

const validateRecordParameter = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  const [isErrorInYear, errorMessageInYear] = validateYear(year);
  if (isErrorInYear) {
    sendResponseMessage(res, errorMessageInYear);
    return;
  }
  const [isErrorInMonth, errorMessageInMonth] = validateMonth(month);
  if (isErrorInMonth) {
    sendResponseMessage(res, errorMessageInMonth);
    return;
  }
  next();
};

const validateRecordReloadParameter = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  const lastEditedAt = req.query.lastEditedAt;
  const [isErrorInYear, errorMessageInYear] = validateYear(year);
  if (isErrorInYear) {
    sendResponseMessage(res, errorMessageInYear);
    return;
  }
  const [isErrorInMonth, errorMessageInMonth] = validateMonth(month);
  if (isErrorInMonth) {
    sendResponseMessage(res, errorMessageInMonth);
    return;
  }
  const [isErrorInDate, errorMessageInDate] = validateDate(lastEditedAt);
  if (isErrorInDate) {
    sendResponseMessage(res, errorMessageInDate);
    return;
  }
  next();
};

export { validateRecordParameter, validateRecordReloadParameter };

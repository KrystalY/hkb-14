import {
  validateYear,
  validateMonth,
  validateDate,
  sendResponseMessage,
} from './common';

const validateRecordParameter = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  let [isError, message] = validateYear(year);
  if (isError) {
    sendResponseMessage(res, message);
    return;
  }
  [isError, message] = validateMonth(month);
  if (isError) {
    sendResponseMessage(res, message);
    return;
  }
  next();
};

const validateRecordReloadParameter = async function (req, res, next) {
  const year = req.params.year;
  const month = req.params.month;
  const lastEditedAt = req.query.lastEditedAt;
  let [isError, message] = validateYear(year);
  if (isError) {
    sendResponseMessage(res, message);
    return;
  }
  [isError, message] = validateMonth(month);
  if (isError) {
    sendResponseMessage(res, message);
    return;
  }
  [isError, message] = validateDate(lastEditedAt);
  if (isError) {
    sendResponseMessage(res, message);
    return;
  }
  next();
};

export { validateRecordParameter, validateRecordReloadParameter };

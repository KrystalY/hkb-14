import { format } from 'date-fns';

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

function getCurrentDateTime() {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}

export { wrapAsync, getCurrentDateTime };

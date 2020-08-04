export const numberFormat = (number) => {
  const intl = Intl.NumberFormat('en-US');
  return intl.format(number);
};

export const getCurrentDatetime = () => {
  const date = analyzeDatetime();
  return `${date.year}-${date.month}-${date.date} ${date.hour}:${date.minute}:${date.second}`;
};

export const dayStr = ['일', '월', '화', '수', '목', '금', '토'];
export const analyzeDatetime = (datetimeStr) => {
  const pad = (str) => str.toString().padStart(2, '0');
  const datetime = datetimeStr.replace(/-/g, '/');

  const dateObj = datetime ? new Date(datetime) : new Date();
  const year = dateObj.getFullYear();
  const month = pad(dateObj.getMonth() + 1);
  const date = pad(dateObj.getDate());
  let hour = pad(dateObj.getHours());
  let minute = pad(dateObj.getMinutes());
  let second = pad(dateObj.getSeconds());
  const day = dayStr[dateObj.getDay()];

  return {
    year,
    month,
    date,
    day,
    hour,
    minute,
    second,
  };
};

export const groupBy = (obj, key) => {
  return obj.reduce((pv, cv) => {
    pv[cv[key]] = pv[cv[key]] ?? [];
    pv[cv[key]].push(cv);
    return pv;
  }, {});
};

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser.
 * @link http://slavik.meltser.info/?p=142
 */
export function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

export const getLastDateOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfWeekInMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

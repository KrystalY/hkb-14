export const getCurrentDatetime = () => {
  const date = analyzeDatetime();
  return `${date.year}-${date.month}-${date.date} ${date.hour}:${date.minute}:${date.second}`;
};

export const dayStr = ['일', '월', '화', '수', '목', '금', '토'];
export const analyzeDatetime = (datetimeStr = '') => {
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

export const getLastDateOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfWeekInMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

export const chunkArray = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

export const formatCurrency = (number) => {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const round = (float, digit) => {
  return Math.round(float * 10 ** digit) / 10 ** digit;
};

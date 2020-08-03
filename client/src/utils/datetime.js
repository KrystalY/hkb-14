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

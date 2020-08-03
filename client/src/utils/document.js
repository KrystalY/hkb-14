export const $ = (selectors) => {
  return document.querySelector(selectors);
};

export const addEventListener = (type, listener, options) => {
  document.addEventListener(type, listener, options);
};

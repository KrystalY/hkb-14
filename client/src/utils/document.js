export const $ = (selectors) => {
  return document.querySelector(selectors);
};

export const addEventListener = (type, listener, options) => {
  document.addEventListener(type, listener, options);
};

export const appendChildAll = (targetElement, ...nodes) => {
  nodes.forEach((node) => {
    if (node instanceof NodeList) {
      node.forEach((child) => {
        targetElement.appendChild(child);
      });
    } else {
      targetElement.appendChild(node);
    }
  });

  return targetElement;
};

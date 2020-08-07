import Component from '../component/Component.js';

export const $ = (selectors) => {
  return document.querySelector(selectors);
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

const parseFromTemplate = (template) => {
  const parser = new DOMParser();
  const $element = parser.parseFromString(template, 'text/html');

  if ($element) {
    return $element;
  }

  return undefined;
};

export const templateToElement = (template) => {
  const element = parseFromTemplate(template);
  return element ? element.body.firstChild : undefined;
};

export const templateToElementNodes = (template) => {
  const element = parseFromTemplate(template);
  return element ? element.body.childNodes : undefined;
};

export const createElement = (tagName, attributes, ...childNodes) => {
  const element = document.createElement(tagName);

  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key === 'tagName') {
        // tagName skip
        continue;
      }

      if (key === 'className') {
        element.className = value;
        continue;
      }

      if (typeof key === 'function') {
        const eventName = key.slice(2); // 'onChange' => 'Change';

        element.addEventListener(eventName, value);
        continue;
      }

      if (key === 'dataset' && typeof value === 'object') {
        for (const [datasetKey, datasetValue] of Object.entries(value)) {
          element.dataset[datasetKey] = datasetValue;
        }
        continue;
      }

      element.setAttribute(key, value);
    }
  }

  if (childNodes) {
    const fragment = document.createDocumentFragment();
    for (const node of childNodes) {
      if (node === null) {
        continue;
      }

      if (node instanceof Component) {
        fragment.appendChild(node.getElement());
        continue;
      }

      fragment.appendChild(node);
    }

    element.appendChild(fragment);
  }

  return element;
};

export const formToDataObject = ($form) => {
  return Object.fromEntries(new FormData($form).entries());
};

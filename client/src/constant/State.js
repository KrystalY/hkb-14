import { Store } from './Store.js';

export const subscribe = (component, key, eventHandler) => {
  if (Store.state[key] === undefined) {
    Store.state[key] = {
      listeners: {},
    };
  }

  Store.state[key].listeners[
    component.uid ?? component.className ?? `#${component.id}`
  ] = {
    eventHandler,
    uid: component.uid ?? component.dataset?.uid,
  };
};

export const notify = (key, data, targetUid = null) => {
  if (targetUid) {
    Object.values(Store.state[key].listeners).some(({ eventHandler, uid }) => {
      if (uid === targetUid) {
        eventHandler(data);
        return true;
      }
    });

    return;
  }

  Object.values(Store.state[key].listeners).forEach(({ eventHandler }) => {
    eventHandler(data);
  });
};

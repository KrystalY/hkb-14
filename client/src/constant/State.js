import { Store } from './Store.js';

const initEventState = (key) => {
  Store.state[key] = {
    listeners: {},
  };
};

export const subscribe = (component, key, eventHandler) => {
  if (Store.state[key] === undefined) {
    initEventState(key);
  }

  Store.state[key].listeners[
    component.uid ?? component.className ?? `#${component.id}`
  ] = {
    eventHandler,
    uid: component.uid ?? component.dataset?.uid,
  };
};

export const notify = (key, data, targetUid = null) => {
  if (!Store.state[key]) {
    return;
  }

  try {
    if (targetUid) {
      Object.values(Store.state[key].listeners).some(
        ({ eventHandler, uid }) => {
          if (uid === targetUid) {
            eventHandler(data);
            return true;
          }
        },
      );

      return;
    }

    Object.values(Store.state[key].listeners).forEach(({ eventHandler }) => {
      eventHandler(data);
    });
  } catch (err) {
    console.error(err);
  }
};

export const clearSubscribers = (key) => {
  if (Store.state[key]) {
    initEventState(key);
  }
};

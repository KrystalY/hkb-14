import { subscribe, notify } from '@src/constant/State';
import { RouterEvent } from '@src/constant/Event.js';
import { Store } from '@constant/Store.js';

export default class Router {
  constructor() {
    this.attribute = {
      className: 'router',
    };
    this.applySubscribers();
    this.addPopStateListener();
  }

  onStateChanged({ path, byPopState }) {
    if (byPopState) {
      return;
    }
    history.pushState({}, '', path);
  }

  applySubscribers() {
    subscribe(
      this.attribute,
      RouterEvent.onStateChanged,
      this.onStateChanged.bind(this),
    );
  }

  addPopStateListener() {
    window.addEventListener('popstate', this.onPopState.bind(this));
  }

  onPopState(e) {
    const path = location.pathname;
    notify(RouterEvent.onStateChanged, { path: path, byPopState: true });
  }
}

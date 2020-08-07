import { subscribe, notify, clearSubscribers } from './constant/State.js';
import { RouterEvent, PageEvent } from './constant/Event.js';

export default class Router {
  constructor() {
    this.attribute = {
      uid: 'router',
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
      RouterEvent.changeUrl,
      this.onChangeUrl.bind(this),
    );
    subscribe(
      this.attribute,
      RouterEvent.onStateChanged,
      this.onStateChanged.bind(this),
    );
  }

  onChangeUrl(data) {
    let path = data.path;
    let [, menu, year, month] = data.path.split('/');
    year = year || new Date().getFullYear();
    month = month || new Date().getMonth() + 1;

    if (data.useCurrentData) {
      const [, , currentYear, currentMonth] = location.pathname.split('/');
      year = currentYear || year;
      month = currentMonth || month;
      const menuUrl = menu ? `/${menu}/` : '';
      path = `${menuUrl}${year}/${month}`;
    }

    clearSubscribers(PageEvent.onAppendDone);
    notify(RouterEvent.onStateChanged, { path, menu, year, month });
  }

  addPopStateListener() {
    window.addEventListener('popstate', this.onPopState.bind(this));
  }

  onPopState(e) {
    const path = location.pathname;
    notify(RouterEvent.onStateChanged, { path: path, byPopState: true });
  }
}

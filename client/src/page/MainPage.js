import Navigator from '@component/Navigator.js';
import DateView from '@component/DateView.js';
import AddRecordForm from '@component/AddRecordForm.js';
import RecordGroup from '@component/RecordGroup.js';
import {
  PageEvent,
  StoreEvent,
  DateViewEvent,
  RouterEvent,
} from '@constant/Event.js';
import { notify, subscribe } from '@constant/State.js';
import { div } from '@utils/defaultElement.js';

// eslint-disable-next-line
import style from '@stylesheet/main-page.scss';

export default class MainPage {
  constructor(container) {
    this.attribute = {
      className: 'main_page',
    };
    this.$container = container;
    this.applySubscribers();
  }

  applySubscribers() {
    subscribe(
      this.attribute,
      RouterEvent.onStateChanged,
      this.onStateChanged.bind(this),
    );
  }

  onStateChanged({ path }) {
    this.clear();
    if (path !== '/login') {
      this.render(path);
    }
  }

  clear() {
    this.$container.innerHTML = '';
  }

  setComponentByPath(path) {
    switch (path) {
      case '/':
        return div(
          { className: 'section' },
          new AddRecordForm(),
          new RecordGroup(),
        );
      default:
        return div(
          { className: 'section' },
          new AddRecordForm(),
          new RecordGroup(),
        );
    }
  }

  render(path) {
    setTimeout(() => {
      notify(DateViewEvent.onDateChanged, { month: 12 });
      notify(StoreEvent.onUpdated, { date: '2020-08-03 11:11:11' });
    }, 1000);

    this.$container.appendChild(
      div(
        { className: 'main_page' },
        new DateView(),
        new Navigator(),
        this.setComponentByPath(path),
      ),
    );
    notify(PageEvent.onAppendDone, {});
  }
}

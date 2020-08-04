import Navigator from '@component/Navigator.js';
import DateView from '@component/DateView.js';
import AddRecordForm from '@component/AddRecordForm.js';
import RecordGroupList from '@component/RecordGroupList.js';
import Calendar from '@component/Calendar.js';
import { PageEvent, DateViewEvent, RouterEvent } from '@constant/Event.js';
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
          new RecordGroupList(),
        );
      case '/calendar':
        return div({ className: 'section' }, new Calendar());
      default:
        return div({ className: 'section' }, new AddRecordForm());
    }
  }

  render(path) {
    setTimeout(() => {
      notify(DateViewEvent.onDateChanged, { month: 12 });
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

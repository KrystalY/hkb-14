import Navigator from '@component/Navigator.js';
import DateView from '@component/DateView.js';
import AddRecordForm from '@component/AddRecordForm.js';
import RecordGroupList from '@component/RecordGroupList.js';
import Calendar from '@component/Calendar.js';
import CategoryChart from '@component/CategoryChart.js';
import DailyChart from '@component/DailyChart.js';
import { PageEvent, RouterEvent } from '@constant/Event.js';
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

  onStateChanged(data) {
    this.clear();
    if (data.menu !== 'login') {
      this.render(data);
    }
  }

  clear() {
    this.$container.innerHTML = '';
  }

  setComponentByPath(data) {
    switch (data.menu) {
      case '':
      case 'record':
        return div(
          { className: 'section' },
          new AddRecordForm(),
          new RecordGroupList(),
        );
      case 'calendar':
        return div({ className: 'section' }, new Calendar());
      case 'statistics':
        return div(
          { className: 'section' },
          new DailyChart(),
          new CategoryChart(),
        );
      default:
        return div({ className: 'section' });
    }
  }

  render(data) {
    this.$container.appendChild(
      div(
        { className: 'main_page' },
        new DateView(),
        new Navigator(),
        this.setComponentByPath(data),
      ),
    );
    notify(PageEvent.onAppendDone, {});
  }
}

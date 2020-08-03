import Header from '@component/Header.js';
import Navigator from '@component/Navigator.js';
import DateView from '@component/DateView.js';
import AddRecordForm from '@component/AddRecordForm.js';
import RecordGroup from '@component/RecordGroup.js';

import { StoreEvent, DateViewEvent } from '@constant/Event.js';
import { notify } from '@constant/State.js';
import { div } from '@utils/defaultElement.js';

// eslint-disable-next-line
import style from '@stylesheet/main-page.scss';

export default class MainPage {
  constructor() {}

  render() {
    setTimeout(() => {
      notify(DateViewEvent.onDateChanged, { month: 7 });
      notify(StoreEvent.onUpdated, { date: '2020-08-02 10:10:11' });
    }, 1000);

    return div(
      {},
      new Header(),
      div(
        { className: 'main_page' },
        new DateView(),
        new Navigator(),
        div({ className: 'section' }, new AddRecordForm(), new RecordGroup()),
      ),
    );
  }
}

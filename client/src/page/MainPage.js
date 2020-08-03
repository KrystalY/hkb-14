import Header from '@src/component/Header.js';
import Navigator from '@src/component/Navigator.js';
import DateView from '@src/component/DateView.js';
import AddRecordForm from '@src/component/AddRecordForm.js';
import RecordGroup from '@src/component/RecordGroup.js';

import { DateViewEvent } from '@src/constant/Event.js';
import { notify } from '@src/constant/State.js';
import { div } from '@src/utils/defaultElement.js';

// eslint-disable-next-line
import style from '@src/stylesheet/main-page.scss';

export default class MainPage {
  constructor() {}

  render() {
    setTimeout(() => {
      notify(DateViewEvent.onDateChanged, { month: 7 });
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

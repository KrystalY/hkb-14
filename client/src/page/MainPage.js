import Header from '@src/component/Header.js';
import Navigator from '@src/component/Navigator.js';
import DateView from '@src/component/DateView.js';

import { DateViewEvent } from '@src/constant/Event.js';
import { notify } from '@src/constant/State.js';

// eslint-disable-next-line
import style from '@src/stylesheet/main-page.scss';

export default class MainPage {
  constructor() {}

  render() {
    setTimeout(() => {
      notify(DateViewEvent.onDateChanged, { month: 12 });
    }, 5000);

    return `
    ${Header()}
    <div class="main_page">
      ${DateView()}
      ${Navigator()}
      <div class="box">
      </div>
    </div>
    `;
  }
}

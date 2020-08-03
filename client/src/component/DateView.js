import Component from '@component/Component.js';
import { DateViewEvent } from '@constant/Event.js';
import { templateToElementNodes } from '@utils/generateElement.js';
import { div } from '@utils/defaultElement.js';
import { $ } from '@utils/document.js';

// eslint-disable-next-line
import style from '@stylesheet/component/DateView.scss';

export default class AddRecordForm extends Component {
  constructor() {
    const attribute = {
      className: 'date_view',
    };

    super({ attribute });
    Object.setPrototypeOf(this, AddRecordForm.prototype);

    this.initSubscribers();
    this.init();
  }

  onDateChanged(data) {
    const $month = $(`.${this.attribute.className} .month`);
    $month.innerHTML = `${data.month}월`;
  }

  initSubscribers() {
    const subscribers = {
      [DateViewEvent.onDateChanged]: this.onDateChanged,
    };
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
    <a class="prev" href="#"><span class="arrow"></span></a>
    <div class="month">7월</div>
    <a class="next" href="#"><span class="arrow-right"></span></a>
    `;

    const innerNode = templateToElementNodes(template);
    return div(this.attribute, ...innerNode);
  }
}

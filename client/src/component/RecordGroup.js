import Component from '@component/Component.js';
import { StoreEvent } from '@constant/Event.js';
import { templateToElementNodes } from '@utils/generateElement.js';
import { $, appendChildAll } from '@utils/document.js';
import { analyzeDatetime } from '@utils/datetime.js';

// eslint-disable-next-line
import style from '@stylesheet/component/RecordGroup.scss';

export default class RecordGroup extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'record_group',
    };

    super({ attribute, isRenderAfterEvent: true });
    Object.setPrototypeOf(this, RecordGroup.prototype);

    this.initSubscribers();
    this.init();
  }

  getContainer() {
    return $(`.${this.attribute.className}`);
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.renderWithDidMount,
    };
    this.setSubscribers(subscribers);
  }

  createGroupDateIndicator(datetime) {
    const dateObj = analyzeDatetime(datetime);

    return `
    <div class="date">
      ${dateObj.month}월 ${dateObj.date}일 <span class="day">(${dateObj.day})</span>
    </div>
    `;
  }

  render(data) {
    if (!data) {
      return;
    }

    const template = `
    <div class="group_header">
      ${this.createGroupDateIndicator(data.date)}
      <div class="sum">
        <span class="plus">+100,000원</span>
        <span class="minus">-2,130,000원</span>
      </div>
    </div>
    <ul class="group_list">
      <li>
        <div class="category">쇼핑/뷰티</div>
        <div class="content">미용실</div>
        <div class="method">현대카드</div>
        <div class="amount">-100,000원</div>
      </li>
      <li class="income">
        <div class="category">월급</div>
        <div class="content">우아한형제들</div>
        <div class="method">현대카드</div>
        <div class="amount">+2,130,000원</div>
      </li>
    </ul>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

import Component from '@component/Component.js';
import { StoreEvent } from '@constant/Event.js';
import { subscribe } from '@constant/State.js';

// eslint-disable-next-line
import style from '@stylesheet/component/RecordGroup.scss';

export default class RecordGroup extends Component {
  constructor() {
    const attribute = {
      className: 'record_group',
    };

    super({ attribute });
    Object.setPrototypeOf(this, RecordGroup.prototype);

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
    <div class="group_header">
      <div class="date">
        7월 31일 <span class="day">(금)</span>
      </div>
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
    <div class="group_header">
      <div class="date">
        7월 30일 <span class="day">(목)</span>
      </div>
      <div class="sum">
        <span class="plus">+0원</span>
        <span class="minus">-27,300원</span>
      </div>
    </div>
    <ul class="group_list">
      <li>
        <div class="category">생활</div>
        <div class="content">생필품</div>
        <div class="method">현대카드</div>
        <div class="amount">-17,200원</div>
      </li>
      <li>
        <div class="category">식비</div>
        <div class="content">버거킹</div>
        <div class="method">현대카드</div>
        <div class="amount">-8,000원</div>
      </li>
      <li>
        <div class="category">식비</div>
        <div class="content">토마토주스</div>
        <div class="method">현대카드</div>
        <div class="amount">-2,100원</div>
      </li>
    </ul>
    `;

    const innerNode = templateToElementNodes(template);
    return div(this.attribute, ...innerNode);
  }
}

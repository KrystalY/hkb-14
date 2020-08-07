import Component from './Component.js';
import { StoreEvent } from '../constant/Event.js';
import {
  $,
  appendChildAll,
  templateToElementNodes,
} from '../utils/document.js';
import { analyzeDatetime, groupBy, formatCurrency } from '../utils/helper.js';

// eslint-disable-next-line
import style from '../stylesheet/component/RecordGroupList.scss';

export default class RecordGroupList extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'record_group_list',
    };

    super({ attribute, isRenderAfterEvent: true });

    this.initSubscribers();
    this.init();
  }

  getContainer() {
    return $(`.${this.attribute.className}`);
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.render,
    };
    this.setSubscribers(subscribers);
  }

  createGroupDateIndicator(datetime) {
    const dateObj = analyzeDatetime(datetime);

    return `
    <div class="date">
      ${dateObj.month}월 ${dateObj.date}일
      <span class="day">(${dateObj.day})</span>
    </div>
    `;
  }

  createGroupSumIndicator(incomeSum, expenditureSum) {
    return `
    <div class="sum">
      <span class="plus">+${formatCurrency(incomeSum)}원</span>
      <span class="minus">-${formatCurrency(expenditureSum)}원</span>
    </div>
    `;
  }

  createGroupItem(item) {
    const preAmount = item.isIncome ? '+' : '-';
    const amount = preAmount + formatCurrency(item.amount);
    return `
    <li${item.isIncome ? ' class="income"' : ''}>
      <div class="category">
        ${item.category.name}
      </div>
      <div class="content">
        ${item.content}
      </div>
      <div class="method">
        ${item.paymentMethod.name}
      </div>
      <div class="amount">
        ${amount}원
      </div>
    </li>
    `;
  }

  createGroup(date, items) {
    let expenditureSum = 0,
      incomeSum = 0;

    const groupItems = items.map((item) => {
      item.isIncome
        ? (incomeSum += item.amount)
        : (expenditureSum += item.amount);
      return this.createGroupItem(item);
    });

    return `
    <div class="record_group">
      <div class="group_header">
        ${this.createGroupDateIndicator(date)}
        ${this.createGroupSumIndicator(incomeSum, expenditureSum)}
      </div>
      <ul class="group_list">
        ${groupItems.join('')}
      </ul>
    </div>
    `;
  }

  render(data) {
    const recordsByDate = groupBy(data.records, 'record_at');

    const template = `
    ${Object.keys(recordsByDate)
      .sort()
      .reverse()
      .map((date) => this.createGroup(date, recordsByDate[date]))}
    `;

    this.element.innerHTML = '';
    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

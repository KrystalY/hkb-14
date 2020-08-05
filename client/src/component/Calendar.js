import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
import {
  getLastDateOfMonth,
  getFirstDayOfWeekInMonth,
  groupBy,
  chunkArray,
  formatCurrency,
} from '@utils/helper.js';
import { StoreEvent } from '@constant/Event.js';

// eslint-disable-next-line
import style from '@stylesheet/component/Calendar.scss';

const DAY_IN_A_BOARD = 42;
const WEEK_IN_A_BOARD = 7;

export default class Calendar extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'calendar',
    };

    super({ attribute, isRenderAfterEvent: true });
    Object.setPrototypeOf(this, Calendar.prototype);

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

  createBoardData(data) {
    const formatedData = this.formatHistoryData(data.records);
    const lastMonthLastDate = getLastDateOfMonth(data.year, data.month - 1);
    const currentMonthLastDate = getLastDateOfMonth(data.year, data.month);
    const firstDayOfWeek = getFirstDayOfWeekInMonth(data.year, data.month);
    const lastMonth = [...Array(firstDayOfWeek).keys()].map((i) => {
      return { day: i + 1 + lastMonthLastDate - firstDayOfWeek, dummy: true };
    });
    const thisMonth = [...Array(currentMonthLastDate).keys()].map((i) => {
      return { day: i + 1, ...(formatedData[i] || {}) };
    });
    const nextMonth = [
      ...Array(DAY_IN_A_BOARD - lastMonth.length - thisMonth.length).keys(),
    ].map((i) => {
      return { day: i + 1, dummy: true };
    });
    const today = new Date();
    if (
      today.getFullYear() == data.year &&
      today.getMonth() + 1 == data.month
    ) {
      thisMonth[today.getDate() - 1].today = true;
    }
    return chunkArray(
      [...lastMonth, ...thisMonth, ...nextMonth],
      WEEK_IN_A_BOARD,
    );
  }

  createBoardHeader() {
    return `
      <tr class="table_header_row">
        <th class="table_header sunday">일</th>
        <th class="table_header">월</th>
        <th class="table_header">화</th>
        <th class="table_header">수</th>
        <th class="table_header">목</th>
        <th class="table_header">금</th>
        <th class="table_header">토</th>
      </tr>`;
  }

  createBoardSpace(spaceData, i) {
    return `
      <td class="table_data ${i === 0 ? 'sunday' : ''} ${
      spaceData.dummy ? 'dummy' : ''
    }
      ${spaceData.today ? 'today' : ''}
      ">
        ${spaceData.day}
        <div class="summary_date">
          <span class="income">${
            spaceData.income ? formatCurrency(spaceData.income) : ''
          }</span>
          <span class="outcome">${
            spaceData.expense ? formatCurrency(spaceData.expense) : ''
          }</span>
        </div>
      </td>`;
  }

  createBoardRow(rowData) {
    return rowData.reduce((acc, spaceData, i) => {
      return acc + this.createBoardSpace(spaceData, i);
    }, '');
  }

  createBoardContent(boardData) {
    return boardData.reduce((acc, rowData) => {
      return (
        acc +
        `<tr class="table_data_row">
          ${this.createBoardRow(rowData)}
        </tr>`
      );
    }, '');
  }
  createBoard(boardData) {
    return `
    <table class="calendar">
      ${this.createBoardHeader()}
      ${this.createBoardContent(boardData)}
    </table>`;
  }

  formatHistoryData(records) {
    const recordsByDate = groupBy(records, 'record_at');
    const formatedDate = {};
    const keys = Object.keys(recordsByDate).sort();
    keys.forEach((key) => {
      formatedDate[new Date(key).getDate()] = recordsByDate[key].reduce(
        (a, b) => {
          return b.isIncome
            ? { ...a, income: a.income || 0 + b.amount }
            : { ...a, expense: a.expense || 0 + b.amount };
        },
        {},
      );
    });

    return formatedDate;
  }

  render(data) {
    const boardData = this.createBoardData(data);
    const template = `
      ${this.createBoard(boardData)}
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

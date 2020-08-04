import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
import {
  getLastDateOfMonth,
  getFirstDayOfWeekInMonth,
  groupBy,
} from '@utils/helper.js';
// eslint-disable-next-line
import style from '@stylesheet/component/Calendar.scss';
import { StoreEvent } from '@constant/Event.js';

const DAY_IN_MONTH = 42;

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

  makeMonthData(formatedData, lastMonthLastDate, firstDayOfWeek) {
    [...Array];
  }

  createMonthData(data) {
    const formatedData = this.formatData(data.records);
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
      ...Array(DAY_IN_MONTH - lastMonth.length - thisMonth.length).keys(),
    ].map((i) => {
      return { day: i + 1, dummy: true };
    });
    return [...lastMonth, ...thisMonth, ...nextMonth];
  }

  createCalendarContent() {}

  formatData(records) {
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
    console.log(data);
    this.createMonthData(data);
    /*html */
    const template = `
      <table class="calendar">
        <tr class="table_header_row">
          <th class="table_header sunday">일</th>
          <th class="table_header">월</th>
          <th class="table_header">화</th>
          <th class="table_header">수</th>
          <th class="table_header">목</th>
          <th class="table_header">금</th>
          <th class="table_header">토</th>
        </tr>
        <tr class="table_data_row">
          <td class="table_data sunday">1</td>
          <td class="table_data">
            2
            <div class="summary_date">
              <span class="income">+275,5000</span>
              <span class="outcome">-3000</span>
            </div>
          </td>
          <td class="table_data">3</td>
          <td class="table_data">4</td>
          <td class="table_data">5</td>
          <td class="table_data">6</td>
          <td class="table_data">7</td>
        </tr>
        <tr class="table_data_row">
          <td class="table_data sunday">1</td>
          <td class="table_data">2</td>
          <td class="table_data">3</td>
          <td class="table_data">4</td>
          <td class="table_data">5</td>
          <td class="table_data">6</td>
          <td class="table_data">7</td>
        </tr>
        <tr class="table_data_row">
          <td class="table_data sunday">1</td>
          <td class="table_data">2</td>
          <td class="table_data">3</td>
          <td class="table_data">4</td>
          <td class="table_data">5</td>
          <td class="table_data">6</td>
          <td class="table_data">7</td>
        </tr>
      </table>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

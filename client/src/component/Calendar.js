import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
// eslint-disable-next-line
import style from '@stylesheet/component/Calendar.scss';
import { StoreEvent } from '@constant/Event.js';

export default class Calendar extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'calendar',
      isRenderAfterEvent: true,
    };

    super({ attribute });
    Object.setPrototypeOf(this, Calendar.prototype);

    this.initSubscribers();
    this.init();
  }

  getContainer() {
    return $(`.${this.attribute.className}`);
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.createCalendarRow,
    };
    this.setSubscribers(subscribers);
  }

  createCalendarRow() {}
  render() {
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

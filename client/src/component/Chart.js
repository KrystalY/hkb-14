// eslint-disable-next-line
import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
import { StoreEvent } from '@constant/Event.js';
import { groupBy, formatCurrency, round } from '@utils/helper.js';

import style from '@stylesheet/component/Bar.scss';

export default class Chart extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'chart',
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

  groupByCategory(records) {
    return groupBy(
      records.filter((record) => !record.isIncome),
      'category_key',
    );
  }

  getSumOfEachCategory(recordsByCategory, categoryInfo) {
    return Object.keys(recordsByCategory).reduce((acc, categoryKey) => {
      return [
        ...acc,
        {
          name: categoryInfo[categoryKey].name,
          sum: recordsByCategory[categoryKey].reduce((acc, category) => {
            return acc + category.amount;
          }, 0),
        },
      ];
    }, []);
  }

  getTotalexpense(categories) {
    return categories.reduce((acc, category) => {
      return acc + category.sum;
    }, 0);
  }

  createBarGraph(data) {
    const recordsByCategory = this.groupByCategory(data.records);
    const formatedData = this.getSumOfEachCategory(
      recordsByCategory,
      data.categories,
    );
    const totalExpense = this.getTotalexpense(formatedData);

    return `
      <ul class="bargraph">
        ${formatedData.reduce((acc, category, i) => {
          return acc + this.createCategory(category, totalExpense, i);
        }, '')}
      </ul>
    `;
  }

  createCategory(category, sum, i) {
    const percent = round((category.sum / sum) * 100, 2);
    /*html */
    return `
    <li>
      <div class="wrap_li">
        <div class="name_category vertical_middle">
          <span>${category.name}</span>
        </div>
        <div class="ratio_category vertical_middle">
          <span>${percent}%</span>
        </div>
        <div class="wrap_bar">
          <div class="bar rank-${i + 1}" style='width:${percent}%;'></div>
        </div>
        <div  class="expense vertical_middle">
          <span>${formatCurrency(category.sum)}원<span>
        </div>
      </div>
    </li>
    `;
  }

  render(data) {
    const template = this.createBarGraph(data);
    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

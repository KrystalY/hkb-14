import Component from './Component.js';
import {
  $,
  appendChildAll,
  templateToElementNodes,
} from '../utils/document.js';
import { StoreEvent } from '../constant/Event.js';
import { groupBy, formatCurrency, round } from '../utils/helper.js';

// eslint-disable-next-line
import styleBar from '../stylesheet/component/Bar.scss';
// eslint-disable-next-line
import stylePie from '../stylesheet/component/Pie.scss';

export default class CategoryChart extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'category_chart',
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
          return acc + this.createGraphOfCategory(category, totalExpense, i);
        }, '')}
      </ul>
    `;
  }

  createGraphOfCategory(category, sum, i) {
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
  createAnc(category, sum, i) {
    const percent = round((category.sum / sum) * 100, 2);
    const offset = round((category.offset / sum) * 100, 2);
    /*html */
    return `
      <div
        class="pie__segment rank-${i + 1}"
        style="--offset: ${offset}; --value: ${percent}; --over50: ${
      percent >= 50 ? 1 : 0
    };">
      <span class="arc-title">
        ${category.name}
      </span>
      </div>
    `;
  }
  createPieChart(data) {
    const recordsByCategory = this.groupByCategory(data.records);
    const formatedData = this.getSumOfEachCategory(
      recordsByCategory,
      data.categories,
    );
    const totalExpense = this.getTotalexpense(formatedData);
    let offset = 0;
    return `
    <div class="wrap_pie vertical_middle horizontal_middle">
      <div class="pie">
        ${formatedData.reduce((acc, category, i) => {
          const arc = this.createAnc({ ...category, offset }, totalExpense, i);
          offset += category.sum;
          return acc + arc;
        }, '')}
        <div
          class="dummy_pie"
          style="--offset: 0; --value: 100; --over50: 1; z-index: 10;"
        >
          <div class="before"></div>
          <div class="after"></div>
          </div>
      </div>
    </div>
    `;
  }

  createCategoryStatistics(data) {
    return this.createPieChart(data) + this.createBarGraph(data);
  }

  render(data) {
    const template = this.createCategoryStatistics(data);
    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

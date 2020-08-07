import Component from '@component/Component.js';
import {
  $,
  appendChildAll,
  templateToElementNodes,
  formToDataObject,
} from '@utils/document.js';
import { notify } from '@constant/State.js';
import { StoreEvent, FilterEvent } from '@constant/Event.js';
import { formatCurrency } from '@utils/helper.js';

// eslint-disable-next-line
import style from '@stylesheet/component/CategoryFilter.scss';

export default class CategoryFilter extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'category_filter',
    };

    super({ attribute });

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.renderAmount,
    };
    this.setSubscribers(subscribers);
  }

  componentDidMount() {
    this.element.addEventListener('change', this.onFilterChanged.bind(this));
  }

  onFilterChanged(e) {
    const $form = e.target.closest('form');
    const formData = formToDataObject($form);

    notify(FilterEvent.onFilterChanged, { formData });
  }

  renderAmount(data) {
    const $box = $(`.${this.attribute.className} .filter_box`);
    const $income = $box.querySelector('.income .amount');
    const $expenditure = $box.querySelector('.expenditure .amount');
    $income.innerHTML = formatCurrency(data.incomeSum);
    $expenditure.innerHTML = formatCurrency(data.expenditureSum);
  }

  render() {
    const template = `
    <form class="filter_box">
      <div class="income">
        # 이번 달 수입 : <span class="amount">0</span>원
      </div>
      <div class="expenditure">
        # 이번 달 지출 : <span class="amount">0</span>원
      </div>
    </form>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

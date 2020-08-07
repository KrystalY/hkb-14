import Component from '@component/Component.js';
import {
  $,
  appendChildAll,
  formToDataObject,
  templateToElementNodes,
} from '@utils/document.js';
import { notify } from '@constant/State.js';
import { StoreEvent, RecordEvent } from '@constant/Event.js';
import { getCurrentDatetime } from '@utils/helper.js';
import { CATEGORY, PAYMENT_METHOD, MESSAGE } from '@constant/constant.js';

// eslint-disable-next-line
import style from '@stylesheet/component/AddRecordForm.scss';

export default class AddRecordForm extends Component {
  constructor() {
    const attribute = {
      tagName: 'form',
      className: 'add_record_form',
    };

    super({ attribute });

    this.state = {
      currentGroup: CATEGORY.EXPENDITURE,
      categories: null,
    };
    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.renderOptions,
    };
    this.setSubscribers(subscribers);
  }

  componentDidMount() {
    const $submit = this.selector('.btn_submit');
    $submit.addEventListener('click', this.onClickSubmit.bind(this));

    const $switchField = this.selector('.switch_field');
    $switchField.addEventListener(
      'change',
      this.onChangeCategoryGroup.bind(this),
    );
  }

  selector(selectStr) {
    return $(`.${this.attribute.className} ${selectStr}`);
  }

  onClickSubmit(e) {
    const $form = e.target.closest(`.${this.attribute.className}`);
    const data = formToDataObject($form);
    const isEmpty = Object.values(data).some((value) => {
      if (value === '') {
        return true;
      }
    });

    if (isEmpty) {
      alert(MESSAGE.FORM_INPUT_EMPTY_ERROR);
      return;
    }

    if (!Number.isInteger(data.amount - 0)) {
      alert(MESSAGE.FORM_VALIDATOR_AMOUNT_ERROR);
      return;
    }

    notify(RecordEvent.create, { data });
  }

  onChangeCategoryGroup(e) {
    this.state.currentGroup = Number.parseInt(e.target.value);
    this.renderCategoryOptions(this.state.categories);
    if (e.target.id === 'optionSpend') {
      $('#payment_method_list').style.display = 'none';
      return;
    }
    if (e.target.id === 'optionIncome') {
      $('#payment_method_list').style.display = 'block';
      return;
    }
  }

  createCategoryOptions(is_income, items) {
    return Object.keys(items)
      .map((i) => {
        const item = items[i];
        if (item.is_income === is_income) {
          return `<option value=${item.key}>${item.name}</option>`;
        }
      })
      .join('');
  }

  createPaymentOptions(items) {
    return Object.keys(items)
      .map((i) => {
        const item = items[i];
        if (item.is_activated === PAYMENT_METHOD.ACTIVATED) {
          return `<option value=${item.key}>${item.name}</option>`;
        }
      })
      .join('');
  }

  renderOptions(data) {
    console.log(data);
    this.state.categories = data.categories;
    this.renderCategoryOptions(data.categories);
    this.renderPaymentMethodOptions(data.paymentMethods);
    this.changeDateValue(data);
  }

  changeDateValue(data) {
    const yearOfToday = new Date().getFullYear();
    const monthOfToday = new Date().getMonth();
    console.log(yearOfToday, monthOfToday);
    if (yearOfToday === data.year && monthOfToday === data.month) {
      return;
    }
    console.log(`${data.year}-${data.month}-01`);
    $('.content input[name="record_at"]').value = `${data.year}-${
      data.month < 10 ? '0' : ''
    }${data.month}-01`;
  }

  renderCategoryOptions(data) {
    const $category = this.selector('select[name=category]');
    $category.innerHTML = this.createCategoryOptions(
      this.state.currentGroup,
      data,
    );
  }

  renderPaymentMethodOptions(data) {
    const $payment = this.selector('select[name=payment_method]');
    $payment.innerHTML = this.createPaymentOptions(data);
  }

  render() {
    const todayDate = getCurrentDatetime().slice(0, 10);
    const template = `
    <div class="block">
      <div class="item">
        <div class="title">분류</div>
        <div class="content switch_field">
          <input type="radio" name="income" id="optionIncome" value="1"></input>
          <label for="optionIncome">수입</label>
          <input type="radio" name="income" id="optionSpend" value="0" checked></input>
          <label for="optionSpend">지출</label>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="item">
        <div class="title">날짜</div>
        <div class="content">
          <input type="date" name="record_at" value="${todayDate}" required>
        </div>
      </div>
      <div class="item">
        <div class="title">카테고리</div>
        <div class="content">
          <select name="category" required>
            <option value="0">선택하세요</option>
          </select>
        </div>
      </div>
      <div class="item"  id="payment_method_list">
        <div class="title">결제수단</div>
        <div class="content">
          <select name="payment_method" required>
            <option value="0">선택하세요</option>
          </select>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="item">
        <div class="title">금액</div>
        <div class="content">
          <input type="number" name="amount" required>
        </div>
      </div>
      <div class="item">
        <div class="title">내용</div>
        <div class="content">
          <input type="text" name="content" required>
        </div>
      </div>
    </div>
    <div class="footer">
      <button type="button" class="btn_submit">등록</button>
    </div>`;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

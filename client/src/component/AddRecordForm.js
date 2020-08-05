import Component from '@component/Component.js';
import {
  $,
  appendChildAll,
  formToDataObject,
  templateToElementNodes,
} from '@utils/document.js';

// eslint-disable-next-line
import style from '@stylesheet/component/AddRecordForm.scss';

export default class AddRecordForm extends Component {
  constructor() {
    const attribute = {
      tagName: 'form',
      className: 'add_record_form',
    };

    super({ attribute });

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  componentDidMount() {
    const $submit = $(`.${this.attribute.className} .btn_submit`);
    $submit.addEventListener('click', this.onClickSubmit.bind(this));
  }

  onClickSubmit(e) {
    const $form = e.target.closest(`.${this.attribute.className}`);
    console.dir(formToDataObject($form));
    alert('save!');
  }

  render() {
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
          <input type="date" name="record_at" value="2020-07-30">
        </div>
      </div>
      <div class="item">
        <div class="title">카테고리</div>
        <div class="content">
          <select name="category">
            <option value="0">선택하세요</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="title">결제수단</div>
        <div class="content">
          <select name="paymentMethod">
            <option value="0">선택하세요</option>
          </select>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="item">
        <div class="title">금액</div>
        <div class="content">
          <input type="text" name="amount">
        </div>
      </div>
      <div class="item">
        <div class="title">내용</div>
        <div class="content">
          <input type="text" name="content">
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

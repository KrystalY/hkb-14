import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
import { StoreEvent } from '@constant/Event.js';

// eslint-disable-next-line
import style from '@stylesheet/component/PaymentMethod.scss';

export default class PaymentMethod extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'payment_method',
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

  render() {
    this.element.innerHTML = '';
    /*html */
    const template = `
      <div class="wrap_payment_method">
        <div class="header_payment_method vertical_middle horizontal_middle">
          <h2>결제 수단 관리 </h2>
          <button class="btn_close">x</button>
        </div>
        <form class="add_method_form vertical_middle">
          <label for="input_method">결제 수단 이름</label>
          <input type="text" id="input_method"></input>
          <button class="btn_apply">완료</button>
        </form>
        <ul class="list_method">
          <li>
            <div class="wrap_method_info vertical_middle horizontal_middle">
              <h3 class="name_method">현대카드</h3>
              <button class="btn_delete_method">삭제</button>
            </div>
          </li>
          <li>
            <div class="wrap_method_info vertical_middle horizontal_middle">
              <h3 class="name_method">카카오체크카드</h3>
              <button class="btn_delete_method">삭제</button>
            </div>
          </li>
        </ul>
      </div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

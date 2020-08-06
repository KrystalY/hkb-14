import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
import { StoreEvent, ModalEvent, PaymentMethodEvent } from '@constant/Event.js';
import { notify } from '@constant/State.js';
// eslint-disable-next-line
import style from '@stylesheet/component/PaymentMethod.scss';

export default class PaymentMethod extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'payment_method',
    };

    super({ attribute });

    this.initSubscribers();
    this.init();
  }

  getContainer() {
    return $(`.${this.attribute.className}`);
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.onDateChanged.bind(this),
      [ModalEvent.open]: this.openModal.bind(this),
      [ModalEvent.close]: this.closeModal.bind(this),
    };
    this.setSubscribers(subscribers);
  }

  onDateChanged(data) {
    const { paymentMethods } = data;
    this.createMethodList(paymentMethods);
  }

  createMethodList(paymentMethods) {
    const methodListElement = $('.list_method');
    methodListElement.innerHTML += Object.keys(paymentMethods).reduce(
      (acc, methodKey) => {
        return acc + this.createMethodLine(paymentMethods[methodKey]);
      },
      '',
    );
  }

  createMethodLine(method) {
    return `
    <li>
      <div class="wrap_method_info vertical_middle horizontal_middle">
        <h3 class="name_method ${
          !method.is_activated ? `disabled_method` : ''
        }">${method.name}</h3>
        <button class="btn_disable_method" data-key=${
          method.key
        } data-activated=${method.is_activated}>${
      method.is_activated ? '삭제' : '추가'
    }</button>
      </div>
    </li>
    `;
  }

  addClickeventListener() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    e.preventDefault();
    if (e.target.closest('.btn_close')) {
      notify(ModalEvent.close, {});
      return;
    }
    if (e.target.closest('.btn_disable_method')) {
      notify(
        e.target.dataset.activated === 1
          ? PaymentMethodEvent.disable
          : PaymentMethodEvent.enable,
        { paymentKey: e.target.dataset.key },
      );
      return;
    }
    if (e.target.closest('.btn_apply')) {
      const methodName = $('#input_method').value;
      if (methodName.length === 0 || methodName.length > 10) {
        alert('입력값이 잘못되었습니다.');
        return;
      }
      notify(PaymentMethodEvent.create, { name: methodName });
    }
  }

  openModal() {
    this.element.style.display = 'block';
  }

  closeModal() {
    this.element.style.display = 'none';
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
          <label for="input_method" >결제 수단 이름</label>
          <input type="text" id="input_method" placeholder="2~10 사이 이름을 입력해주세요."></input>
          <button class="btn_apply">완료</button>
        </form>
        <ul class="list_method"></ul>
      </div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
    this.addClickeventListener();
  }
}

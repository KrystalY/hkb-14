import Component from '@component/Component.js';
import { appendChildAll, templateToElementNodes } from '@utils/document.js';
import { notify } from '@constant/State.js';
import { RouterEvent, ModalEvent } from '@src/constant/Event.js';
// eslint-disable-next-line
import style from '@stylesheet/component/Header.scss';

export default class Header extends Component {
  constructor() {
    const attribute = {
      tagName: 'header',
      className: 'header',
    };

    super({ attribute });

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  addClickeventListener() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    if (e.target.closest('.btn_log')) {
      notify(RouterEvent.changeUrl, {
        path: `/`,
      });
    }
  }

  render() {
    const template = `
    <div class="logo">
      <button class="btn_log">가계부 서비스</button>
    </div>
    <div class="menu">
      <div class="menu_item">
        <button class="btn_payment_method">결제 수단 관리</button>
      </div>
    </div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
    this.addClickeventListener();
  }
}

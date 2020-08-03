import Component from '@component/Component.js';
import { appendChildAll, templateToElementNodes } from '@utils/document.js';

// eslint-disable-next-line
import style from '@stylesheet/component/Header.scss';

export default class Header extends Component {
  constructor() {
    const attribute = {
      tagName: 'header',
      className: 'header',
    };

    super({ attribute });
    Object.setPrototypeOf(this, Header.prototype);

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
    <div class="logo">가계부 서비스</div>
    <div class="menu">
      <div class="menu_item">
        <a href="#">결제 수단 관리</a>
      </div>
    </div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

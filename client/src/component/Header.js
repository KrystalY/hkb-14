import Component from '@src/component/Component.js';
import { templateToElementNodes } from '@src/utils/generateElement.js';
import { header } from '@src/utils/defaultElement.js';

// eslint-disable-next-line
import style from '@src/stylesheet/component/Header.scss';

export default class Header extends Component {
  constructor() {
    const attribute = {
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
      <div><a href="#">결제 수단 관리</a></div>
    </div>
    `;

    const innerNode = templateToElementNodes(template);
    return header(this.attribute, ...innerNode);
  }
}

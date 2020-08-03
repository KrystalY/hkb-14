import Component from '@component/Component.js';
import { templateToElementNodes } from '@utils/generateElement.js';
import { div } from '@utils/defaultElement.js';

// eslint-disable-next-line
import style from '@stylesheet/component/Navigator.scss';

export default class Navigator extends Component {
  constructor() {
    const attribute = {
      className: 'navigator',
    };

    super({ attribute });
    Object.setPrototypeOf(this, Navigator.prototype);

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
    <ul class="tab">
      <li class="tabbed">내역</li>
      <li>달력</li>
      <li>통계</li>
    </ul>
    `;

    const innerNode = templateToElementNodes(template);
    return div(this.attribute, ...innerNode);
  }
}

import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';

// eslint-disable-next-line
import style from '@stylesheet/component/Navigator.scss';

export default class Navigator extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'navigator',
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
    console.dir($(`.${this.attribute.className}`));
  }

  render() {
    const template = `
    <ul class="tab">
      <li class="tabbed" value="">내역</li>
      <li value="calendar">달력</li>
      <li value="statistics">통계</li>
    </ul>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

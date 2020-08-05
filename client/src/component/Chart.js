import Component from '@component/Component.js';
import { $, appendChildAll, templateToElementNodes } from '@utils/document.js';
// eslint-disable-next-line
import style from '@stylesheet/component/Bar.scss';
import { StoreEvent } from '@constant/Event.js';

export default class Chart extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'chart',
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

  render(data) {
    const template = `
      <ul class="bargraph">
        <li>
          <div class="wrap_li">
            <div class="name_category vertical_middle">
              <span>생활</span>
            </div>
            <div class="ratio_category vertical_middle">
              <span>15%</span>
            </div>
            <div class="wrap_bar">
              <div class="bar"></div>
            </div>
            <div  class="expense vertical_middle">
              <span>315,000<span>
            </div>
          </div>
        </li>
        <li class="wrap_li">식비</li>
        <li class="wrap_li">교통</li>
      </ul>
    `;
    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

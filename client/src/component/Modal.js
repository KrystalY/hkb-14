import Component from '@component/Component.js';
import { appendChildAll, templateToElementNodes } from '@utils/document.js';

// eslint-disable-next-line
import style from '@stylesheet/component/Modal.scss';

export default class Modal extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'modal',
    };

    super({ attribute });

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
      <div class="modal_layer"></div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

import Component from '@component/Component.js';
import { appendChildAll, templateToElementNodes } from '@utils/document.js';
import { ModalEvent } from '@src/constant/Event.js';
import { notify } from '@constant/State.js';

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

  openModal() {
    this.element.style.display = 'block';
  }

  closeModal() {
    this.element.style.display = 'none';
  }

  addClickeventListener() {
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    notify(ModalEvent.close, {});
  }

  initSubscribers() {
    const subscribers = {
      [ModalEvent.open]: this.openModal.bind(this),
      [ModalEvent.close]: this.closeModal.bind(this),
    };
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
      <div class="modal_layer"></div>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
    this.addClickeventListener();
  }
}

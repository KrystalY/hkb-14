import { subscribe } from '@constant/State.js';
import { createElement } from '@utils/generateElement.js';

export default class Component {
  constructor(args) {
    // [isRenderAfterEvent] 이 옵션을 활성화하면, 컨테이너만 추가됩니다.
    // 이벤트 이후에 렌더링을 원하는 경우, true로 설정합니다.
    this.isRenderAfterEvent = args?.isRenderAfterEvent ?? false;
    this.attribute = args.attribute;
    Object.setPrototypeOf(this, Component.prototype);
  }

  initElement() {
    this.element = createElement(this.attribute.tagName, this.attribute);
  }

  init() {
    this.initElement();
    this.applySubscribers();

    if (this.isRenderAfterEvent === false) {
      this.renderWithDidMount();
    }
  }

  renderWithDidMount(data) {
    this.render(data);
    this.componentDidMount();
  }

  setSubscribers(subscribers) {
    this.subscribers = subscribers;
  }

  applySubscribers() {
    if (!this.subscribers) {
      return;
    }

    Object.entries(this.subscribers).map(([key, eventHandler]) => {
      subscribe(this.attribute, key, eventHandler.bind(this));
    });
  }

  getElement() {
    return this.element;
  }

  // call this function after render
  componentDidMount() {}
  render() {}
}

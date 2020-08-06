import { subscribe } from '@constant/State.js';
import { RouterEvent } from '@constant/Event.js';
import { appendChildAll, templateToElementNodes } from '@utils/document.js';
export default class SigninPage {
  constructor(container) {
    this.attribute = {
      className: 'signin_page',
    };
    this.container = container;
    this.applySubscribers();
  }

  applySubscribers() {
    subscribe(
      this.attribute,
      RouterEvent.onStateChanged,
      this.onStateChanged.bind(this),
    );
  }

  onStateChanged({ path }) {
    if (path !== '/login') {
      this.clear();
    } else {
      this.render();
    }
  }

  clear() {
    this.$container.innerHtml = '';
  }

  render() {
    const template = `<button>Google Login</button>`;
    const innerNode = templateToElementNodes(template);
    appendChildAll(this.container, innerNode);
  }
}

import { subscribe } from '@constant/State.js';
import { RouterEvent } from '@constant/Event.js';
import { div } from '@utils/defaultElement.js';

export default class Signin {
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
    this.container.appendChild(div({ className: 'login_page' }));
  }
}

import Header from '@component/Header.js';
import PaymentMethod from '@component/PaymentMethod.js';
import MainPage from '@src/page/MainPage';
import { div } from '@utils/defaultElement.js';
import { $ } from '@utils/document.js';

export default class Layout {
  constructor(container) {
    this.$container = container;

    this.render();
    new MainPage($('.content'));
  }

  render() {
    this.$container.appendChild(
      div({}, new Header(), new PaymentMethod(), div({ className: 'content' })),
    );
  }
}

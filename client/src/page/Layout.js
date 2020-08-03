import Header from '@src/component/Header.js';
import MainPage from '@src/page/MainPage';
import { div } from '@src/utils/defaultElement.js';
import { $ } from '@utils/document.js';

export default class Layout {
  constructor(container) {
    this.$container = container;

    this.render();
    new MainPage($('.content'));
  }

  render() {
    this.$container.appendChild(
      div({}, new Header(), div({ className: 'content' })),
    );
  }

  renderMainPage() {
    return new MainPage().render();
  }

  renderLoginPage() {
    return div({ className: 'login_page' });
  }
}

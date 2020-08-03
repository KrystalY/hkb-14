import MainPage from '@src/page/MainPage.js';

// eslint-disable-next-line
import style from '@src/stylesheet/base.scss';

export default class App {
  constructor(container) {
    this.$container = container;
  }

  start() {
    this.$container.appendChild(new MainPage().render());
  }
}

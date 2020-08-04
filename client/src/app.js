import Model from '@src/model/model.js';
import MainPage from '@src/page/MainPage.js';

// eslint-disable-next-line
import style from '@stylesheet/base.scss';

export default class App {
  constructor(container) {
    this.$container = container;
  }

  start() {
    new Model();
    new MainPage(this.$container).render();
  }
}

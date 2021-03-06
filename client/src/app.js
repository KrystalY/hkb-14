import Model from '@src/model/model.js';
import Layout from '@src/page/Layout.js';
import { RouterEvent } from '@constant/Event.js';
import { notify } from '@constant/State.js';
import Router from '@src/router.js';

// eslint-disable-next-line
import style from '@stylesheet/base.scss';

export default class App {
  constructor(container) {
    this.$container = container;
  }

  start() {
    new Model();
    new Layout(this.$container);
    new Router();

    notify(RouterEvent.changeUrl, { path: location.pathname });
  }
}

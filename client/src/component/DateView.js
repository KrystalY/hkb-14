import Component from './Component.js';
import { StoreEvent, RouterEvent } from '../constant/Event.js';
import {
  $,
  appendChildAll,
  templateToElementNodes,
} from '../utils/document.js';
import { notify } from '../constant/State.js';

// eslint-disable-next-line
import style from '../stylesheet/component/DateView.scss';

export default class DateView extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'date_view',
    };

    super({ attribute });

    this.state = {
      menu: null,
      year: null,
      month: null,
    };
    this.initSubscribers();
    this.init();
  }

  componentDidMount() {
    const $dateview = $(`.${this.attribute.className}`);
    $dateview.addEventListener('click', this.onClickButton.bind(this));
  }

  onClickButton(e) {
    e.preventDefault();
    const $button = e.target.closest('.action');
    if (!$button || $button.tagName !== 'A') {
      return;
    }

    const action = $button.dataset.action;
    const date = new Date(`${this.state.year}/${this.state.month}/1`);
    if (action === 'prev') {
      date.setMonth(date.getMonth() - 1);
    } else if (action === 'next') {
      date.setMonth(date.getMonth() + 1);
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    notify(RouterEvent.changeUrl, {
      path: `/${this.state.menu}/${year}/${month}`,
    });
  }

  onDateChanged(data) {
    this.state = data.currentPath;

    const $current_date = $(`.${this.attribute.className} .current_date`);
    $current_date.innerHTML = `${data.year}년 ${data.month}월`;
  }

  initSubscribers() {
    const subscribers = {
      [StoreEvent.onUpdated]: this.onDateChanged,
    };
    this.setSubscribers(subscribers);
  }

  render() {
    const template = `
    <a class="action" data-action="prev" href="#prev"><span class="arrow"></span></a>
    <div class="current_date"></div>
    <a class="action" data-action="next" href="#next"><span class="arrow-right"></span></a>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

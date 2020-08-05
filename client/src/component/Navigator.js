import Component from '@component/Component.js';
import { appendChildAll, templateToElementNodes } from '@utils/document.js';
import { notify } from '@constant/State.js';
import { RouterEvent } from '@src/constant/Event.js';

// eslint-disable-next-line
import style from '@stylesheet/component/Navigator.scss';

export default class Navigator extends Component {
  constructor() {
    const attribute = {
      tagName: 'div',
      className: 'navigator',
    };

    super({ attribute });

    this.initSubscribers();
    this.init();
  }

  initSubscribers() {
    const subscribers = {};
    this.setSubscribers(subscribers);
  }

  componentDidMount() {
    this.addTabClickEventListener();
  }

  addTabClickEventListener() {
    this.element.addEventListener('click', this.onClickTab.bind(this));
  }

  onClickTab(e) {
    notify(RouterEvent.changeUrl, {
      path: `/${e.target.dataset.name}`,
      useCurrentData: true,
    });
  }

  render() {
    const template = `
    <ul class="tab">
      <li class="tabbed" data-name="record">내역</li>
      <li data-name="calendar">달력</li>
      <li data-name="statistics">통계</li>
    </ul>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

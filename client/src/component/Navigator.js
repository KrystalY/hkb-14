import Component from '@component/Component.js';
import { appendChildAll, templateToElementNodes, $ } from '@utils/document.js';
import { notify } from '@constant/State.js';
import { RouterEvent, StoreEvent } from '@constant/Event.js';

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

  onDateChanged(data) {
    const { menu } = data.currentPath;
    const tabbedElement = $(`.tab li[data-name=${menu || 'record'}]`);
    tabbedElement.classList.add('tabbed');
  }

  initSubscribers() {
    const subscribers = { [StoreEvent.onUpdated]: this.onDateChanged };
    this.setSubscribers(subscribers);
  }

  componentDidMount() {
    this.addTabClickEventListener();
  }

  addTabClickEventListener() {
    this.element.addEventListener('click', this.onClickTab.bind(this));
  }

  onClickTab(e) {
    e.target.classList.add('tabbed');
    notify(RouterEvent.changeUrl, {
      path: `/${e.target.dataset.name}`,
      useCurrentData: true,
    });
  }

  render() {
    const template = `
    <ul class="tab">
      <li data-name="record">내역</li>
      <li data-name="calendar">달력</li>
      <li data-name="statistics">통계</li>
    </ul>
    `;

    const innerNode = templateToElementNodes(template);
    appendChildAll(this.element, innerNode);
  }
}

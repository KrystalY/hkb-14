import { subscribe } from '@src/constant/State.js';
import { DateViewEvent } from '@src/constant/Event.js';

// eslint-disable-next-line
import style from '@src/stylesheet/component/DateView.scss';

export default function DateView() {
  const component = {
    name: 'date_view',
  };

  function render() {
    const html = `
    <a class="prev" href="#"><span class="arrow"></span></a>
    <div class="month">7월</div>
    <a class="next" href="#"><span class="arrow-right"></span></a>
    `;

    const $dateview = document.querySelector(`.${component.name}`);
    $dateview.innerHTML = html;
  }

  function onDateChanged(data) {
    console.log(data);
    const $month = document.querySelector(`.${component.name} .month`);
    $month.innerHTML = `${data.month}월`;
  }

  subscribe(component, DateViewEvent.onDateChanged, onDateChanged);

  setTimeout(render, 0);
  return `<div class=${component.name} data-uid=${component.uid}></div>`;
}

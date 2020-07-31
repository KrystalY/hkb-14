// eslint-disable-next-line
import style from '@src/stylesheet/component/Navigator.scss';

export default function Navigator() {
  const component = {
    name: 'navigator',
  };

  function render() {
    const html = `
    <ul class="tab">
      <li class="tabbed">내역</li>
      <li>달력</li>
      <li>통계</li>
    </ul>
    `;

    const $navigator = document.querySelector(`.${component.name}`);
    $navigator.innerHTML = html;
  }

  setTimeout(render, 0);
  return `<div class=${component.name}></div>`;
}

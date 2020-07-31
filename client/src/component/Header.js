// eslint-disable-next-line
import style from '@src/stylesheet/component/Header.scss';

export default function Header() {
  const component = {
    name: 'header',
  };

  function render() {
    const html = `
    <div class="logo">가계부 서비스</div>
    <div class="menu">
      <div><a href="#">결제 수단 관리</a></div>
    </div>
    `;

    const $header = document.querySelector(`.${component.name}`);
    $header.innerHTML = html;
  }

  setTimeout(render, 0);
  return `<header class=${component.name}></header>`;
}

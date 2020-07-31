// eslint-disable-next-line
import style from '@src/stylesheet/component/AddRecordForm.scss';

export default function AddRecordForm() {
  const component = {
    name: 'add_record_form',
  };

  function render() {
    const html = `
    <div class="block">
      <div class="item">
        <div class="title">분류</div>
        <div class="content switch_field">
          <input type="radio" name="income" id="optionIncome" value="1"></input>
          <label for="optionIncome">수입</label>
          <input type="radio" name="income" id="optionSpend" value="0" checked></input>
          <label for="optionSpend">지출</label>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="item">
        <div class="title">날짜</div>
        <div class="content">
          <input type="date" name="record_at" value="2020-07-30">
        </div>
      </div>
      <div class="item">
        <div class="title">카테고리</div>
        <div class="content">
          <select>
            <option value="0">선택하세요</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="title">결제수단</div>
        <div class="content">
          <select>
            <option value="0">선택하세요</option>
          </select>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="item">
        <div class="title">금액</div>
        <div class="content">
          <input type="text">
        </div>
      </div>
      <div class="item">
        <div class="title">내용</div>
        <div class="content">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="btn_submit">등록</button>
    </div>
    `;

    const $addRecordForm = document.querySelector(`.${component.name}`);
    $addRecordForm.innerHTML = html;
  }

  setTimeout(render, 0);
  return `<form class=${component.name}></form>`;
}

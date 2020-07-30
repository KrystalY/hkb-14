import Pool from './pool';

const FIND_BY_YEAR_AND_MONTH =
  'SELECT * FROM MONEY_RECORD WHERE RECORD_AT BETWEEN ? AND ? ORDER BY RECORD_AT, `KEY`';
const GET_RECENT_UPDATED_RECORD_BY_YEAR_AND_MONTH =
  'SELECT EDITED_AT FROM MONEY_RECORD WHERE RECORD_AT BETWEEN ? AND ? ORDER BY EDITED_AT DESC LIMIT 1';
export default class Record {
  constructor() {}

  async findByYearAndMonth(year, month) {
    const connection = await Pool.getConnection();
    const [firstDate, lastDate] = this.getRangeOfMonth(year, month);
    const [rows] = await connection.execute(FIND_BY_YEAR_AND_MONTH, [
      firstDate,
      lastDate,
    ]);
    connection.release();
    return rows;
  }

  async getRecentUpdatedRecord(year, month) {
    const connection = await Pool.getConnection();
    const [firstDate, lastDate] = this.getRangeOfMonth(year, month);
    const [
      row,
    ] = await connection.execute(GET_RECENT_UPDATED_RECORD_BY_YEAR_AND_MONTH, [
      firstDate,
      lastDate,
    ]);
    connection.release();
    return row;
  }

  getLastDay(year, month) {
    return new Date(year, month, 0).getDate();
  }

  getRangeOfMonth(year, month) {
    const firstDayOfMonth = 1;
    const lastDayOfMonth = this.getLastDay(year, month);
    return [
      this.getDateString(year, month, firstDayOfMonth),
      this.getDateString(year, month, lastDayOfMonth),
    ];
  }

  getDateString(year, month, day) {
    return `${year}-${month}-${day}`;
  }
}

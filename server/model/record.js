import Pool from './pool';
import { getCurrentDateTime } from '@util/index';

const INSERT_RECORD = `
  INSERT INTO MONEY_RECORD
  (user_key, category_key, payment_method_key, record_at, amount, content, created_at, edited_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;
const FIND_BY_YEAR_AND_MONTH =
  'SELECT * FROM MONEY_RECORD WHERE RECORD_AT BETWEEN ? AND ? ORDER BY RECORD_AT, `KEY`';
const GET_RECENT_UPDATED_RECORD_BY_YEAR_AND_MONTH =
  'SELECT EDITED_AT FROM MONEY_RECORD WHERE RECORD_AT BETWEEN ? AND ? ORDER BY EDITED_AT DESC LIMIT 1';

export default class Record {
  constructor() {}

  async createRecord(data) {
    const connection = await Pool.getConnection();
    const currentDatetime = getCurrentDateTime();
    const [rows] = await connection.execute(INSERT_RECORD, [
      data.userKey,
      data.categoryKey,
      data.paymentMethodKey,
      data.recordAt,
      data.amount,
      data.content,
      currentDatetime,
      currentDatetime,
    ]);
    connection.release();
    return rows;
  }

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

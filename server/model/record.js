import Pool from './pool';

const FIND_BY_YEAR_AND_MONTH = `SELECT * FROM MONEY_RECORD`;

export default class Record {
  static async FindByYearAndMonth(year, month) {
    const conn = await Pool.getConnection();
    try {
      const [rows] = await conn.query(FIND_BY_YEAR_AND_MONTH);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

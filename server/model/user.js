import Pool from './pool';

const GET_CATEGORY = 'SELECT * FROM CATEGORY WHERE 1';
const GET_PAYMENT_METHOD_BY_USER_KEY =
  'SELECT `key`, name, is_activated FROM PAYMENT_METHOD WHERE user_key = ?';

export default class User {
  constructor() {}

  async getCategory() {
    const connection = await Pool.getConnection();
    const [rows] = await connection.execute(GET_CATEGORY);
    connection.release();
    return rows;
  }

  async getPaymentMethod(userKey) {
    const connection = await Pool.getConnection();
    const [rows] = await connection.execute(GET_PAYMENT_METHOD_BY_USER_KEY, [
      userKey,
    ]);
    connection.release();
    return rows;
  }
}

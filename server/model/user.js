import Pool from './pool';

const GET_CATEGORY = 'SELECT * FROM CATEGORY WHERE 1';
const GET_PAYMENT_METHOD_BY_USER_KEY =
  'SELECT `key`, name, is_activated FROM PAYMENT_METHOD WHERE user_key = ?';

const UPDATE_PAYMENT_METHOD =
  'UPDATE PAYMENT_METHOD SET is_activated = ? WHERE user_key = ? AND `key` = ?';

const INSERT_PAYMENT_METHOD =
  'INSERT INTO PAYMENT_METHOD(name, is_activated, user_key) VALUES (?, 1, ?)';

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

  async createPaymentMethod(userKey) {
    const connection = await Pool.getConnection();
    const [rows] = await connection.execute(GET_PAYMENT_METHOD_BY_USER_KEY, [
      userKey,
    ]);
    connection.release();
    return rows;
  }

  async updatePaymentMethod(userKey, paymentKey, isActivated) {
    const connection = await Pool.getConnection();
    const [rows] = await connection.execute(UPDATE_PAYMENT_METHOD, [
      isActivated,
      userKey,
      paymentKey,
    ]);
    connection.release();
    return rows;
  }

  async insertPaymentMethod(name, userKey) {
    const connection = await Pool.getConnection();
    const [rows] = await connection.execute(INSERT_PAYMENT_METHOD, [
      name,
      userKey,
    ]);
    connection.release();
    return rows;
  }
}

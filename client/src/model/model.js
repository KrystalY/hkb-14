import apis from '@src/model/apis.js';
import { Store } from '@constant/Store.js';
import { PageEvent, StoreEvent } from '@constant/Event.js';
import { subscribe, notify } from '@constant/State.js';
import { CATEGORY } from '@constant/constant.js';

const customPaymentMethod = {
  4: {
    name: '현대카드',
    is_activated: 1,
  },
};

const customCategory = {
  1: {
    name: '쇼핑',
    is_income: 0,
  },
  2: {
    name: '용돈',
    is_income: 1,
  },
};

export default class Model {
  constructor() {
    subscribe({ uid: Model }, PageEvent.onAppendDone, () => this.getRecord());
  }

  convertData(item) {
    const category = Store.categories[item.category_key];
    const paymentMethod = Store.paymentMethods[item.payment_method_key];
    const isIncome = category.is_income === CATEGORY.INCOME;
    return { ...item, category, paymentMethod, isIncome };
  }

  async getRecord(data) {
    const { year, month, type } = { year: 2020, month: 7 };
    await this.setDefaultData();
    await this.setRecord(year, month);
    if (type) {
      Store.records = Store.records.filter((record) => record.type == type);
    }

    notify(StoreEvent.onUpdated, { ...Store });
  }

  async setRecord(year, month) {
    let expenditureSum = 0,
      incomeSum = 0;

    const data = await (await apis.findRecord({ year, month })).json();
    Store.year = data.year;
    Store.month = data.month;
    Store.records = data.items.map((record) => {
      const converted = this.convertData(record);
      converted.category.is_income == CATEGORY.INCOME
        ? (incomeSum += record.amount)
        : (expenditureSum += record.amount);
      return converted;
    });
    Store.incomeSum = incomeSum;
    Store.expenditureSum = expenditureSum;
  }

  async setDefaultData() {
    if (Store.paymentMethods) {
      return;
    }

    Store.categories = customCategory;
    Store.paymentMethods = customPaymentMethod;
  }
}

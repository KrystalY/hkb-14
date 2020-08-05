import apis from '@src/model/apis.js';
import { Store } from '@constant/Store.js';
import { StoreEvent, RouterEvent, RecordEvent } from '@constant/Event.js';
import { subscribe, notify } from '@constant/State.js';
import { CATEGORY, MESSAGE } from '@constant/constant.js';

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
    const attribute = { uid: Model };
    subscribe(attribute, RouterEvent.onStateChanged, this.getRecord.bind(this));
    subscribe(attribute, RecordEvent.create, this.createRecord.bind(this));
  }

  convertData(item) {
    const category = Store.categories[item.category_key];
    const paymentMethod = Store.paymentMethods[item.payment_method_key];
    const isIncome = category.is_income === CATEGORY.INCOME;
    return { ...item, category, paymentMethod, isIncome };
  }

  async createRecord({ data }) {
    data.user = Store.user.key;
    await (await apis.createRecord(data)).json();

    const [year, month] = data.record_at.split('-');
    notify(RouterEvent.changeUrl, { path: `/record/${year}/${month}` });
  }

  async getRecord(data) {
    const { year, month } = data;
    await this.fetchDefaultData();
    await this.fetchRecord(year, month);
    notify(StoreEvent.onUpdated, { ...Store });
  }

  async fetchRecord(year, month) {
    let expenditureSum = 0,
      incomeSum = 0;

    const data = await (await apis.findRecord({ year, month })).json();
    if (!data.success) {
      alert(MESSAGE.API_USER_INPUT_ERROR);
      location.href = '/';
    }

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

  async fetchDefaultData() {
    if (Store.paymentMethods) {
      return;
    }

    Store.user = {
      key: 1,
    };
    Store.categories = customCategory;
    Store.paymentMethods = customPaymentMethod;
  }
}

import apis from '@src/model/apis.js';
import { Store } from '@constant/Store.js';
import {
  StoreEvent,
  RouterEvent,
  RecordEvent,
  PaymentMethodEvent,
} from '@constant/Event.js';
import { subscribe, notify } from '@constant/State.js';
import { CATEGORY, MESSAGE } from '@constant/constant.js';
import { extractDataFromKey } from '@utils/helper.js';

export default class Model {
  constructor() {
    const attribute = { uid: Model };
    subscribe(attribute, RouterEvent.onStateChanged, this.getRecord.bind(this));
    subscribe(attribute, RecordEvent.create, this.createRecord.bind(this));
    subscribe(
      attribute,
      PaymentMethodEvent.disable,
      this.disablePaymentMethod.bind(this),
    );
    subscribe(
      attribute,
      PaymentMethodEvent.enable,
      this.enablePaymentMethod.bind(this),
    );
    subscribe(
      attribute,
      PaymentMethodEvent.create,
      this.createPaymentMethod.bind(this),
    );
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
    Store.currentPath = data;
    const { year, month } = data;
    await this.fetchDefaultData();
    await this.fetchRecord(year, month);
    notify(StoreEvent.onUpdated, { ...Store });
  }

  async fetchRecord(year, month) {
    let expenditureSum = 0,
      incomeSum = 0;

    const data = await (await apis.getRecord({ year, month })).json();
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

    const categoriesData = await (await apis.getCategory()).json();
    const paymentMethodsData = await (
      await apis.getPaymentMethod(Store.user)
    ).json();

    Store.categories = extractDataFromKey(categoriesData.items, 'key');
    Store.paymentMethods = extractDataFromKey(paymentMethodsData.items, 'key');
  }

  async createPaymentMethod({ name }) {
    const userKey = Store.user.key;
    const { success, items } = await (
      await apis.createPaymentMethod({ name, userKey })
    ).json();
    if (success) {
      notify(StoreEvent.paymentUpdated, { paymentMethods: items });
    }
  }

  async disablePaymentMethod({ paymentKey }) {
    const userKey = Store.user.key;
    const { success, items } = await (
      await apis.disablePaymentMethod({ paymentKey, userKey })
    ).json();
    if (success) {
      notify(StoreEvent.paymentUpdated, { paymentMethods: items });
    }
  }

  async enablePaymentMethod({ paymentKey }) {
    const userKey = Store.user.key;
    const { success, items } = await (
      await apis.enablePaymentMethod({ paymentKey, userKey })
    ).json();
    if (success) {
      notify(StoreEvent.paymentUpdated, { paymentMethods: items });
    }
  }
}

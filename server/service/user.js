import UserModel from '@model/user';

const userModel = new UserModel();

async function getCategory() {
  const category = await userModel.getCategory();
  return category;
}

async function getPaymentMethod(userKey) {
  const paymentMethod = await userModel.getPaymentMethod(userKey);
  return paymentMethod;
}

async function insertPaymentMethod(name, userKey) {
  const paymentMethod = await userModel.insertPaymentMethod(name, userKey);
  return paymentMethod;
}

async function updatePaymentMethod(isActivated, userKey, paymentKey) {
  const paymentMethod = await userModel.updatePaymentMethod(
    isActivated,
    userKey,
    paymentKey,
  );
  return paymentMethod;
}

export {
  getCategory,
  getPaymentMethod,
  insertPaymentMethod,
  updatePaymentMethod,
};

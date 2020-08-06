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

export { getCategory, getPaymentMethod };

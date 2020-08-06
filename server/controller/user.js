import {
  getCategory,
  getPaymentMethod,
  insertPaymentMethod,
  updatePaymentMethod,
} from '@service/user';

const getCategories = async function (req, res, next) {
  const items = await getCategory();

  res.send({
    success: true,
    items,
  });
};

const getPaymentMethods = async function (req, res, next) {
  const userKey = req.params.userKey;
  const items = await getPaymentMethod(userKey);

  res.send({
    success: true,
    items,
  });
};

const createPaymentMethod = async function (req, res, next) {
  const { name, userKey } = req.body;
  await insertPaymentMethod(name, userKey);
  const items = await getPaymentMethod(userKey);
  res.send({
    success: true,
    items,
  });
};

const disablePaymentMethod = async function (req, res, next) {
  const { userKey, paymentKey } = req.body;
  await updatePaymentMethod(userKey, paymentKey, 0);
  const items = await getPaymentMethod(userKey);
  res.send({
    success: true,
    items,
  });
};

const enablePaymentMethod = async function (req, res, next) {
  const { userKey, paymentKey } = req.body;
  await updatePaymentMethod(userKey, paymentKey, 1);
  const items = await getPaymentMethod(userKey);
  res.send({
    success: true,
    items,
  });
};

export {
  getCategories,
  getPaymentMethods,
  disablePaymentMethod,
  enablePaymentMethod,
  createPaymentMethod,
};

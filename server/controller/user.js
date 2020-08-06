import { getCategory, getPaymentMethod } from '@service/user';

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

export { getCategories, getPaymentMethods };

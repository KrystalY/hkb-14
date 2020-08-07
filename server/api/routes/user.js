const express = require('express');
const router = express.Router();
import { wrapAsync } from '@util';
import {
  getCategories,
  getPaymentMethods,
  disablePaymentMethod,
  enablePaymentMethod,
  createPaymentMethod,
} from '@controller/user';

// 결제수단 목록 API
router.get('/payment-method/:userKey', wrapAsync(getPaymentMethods));
// 결제수단 비활성화
router.post('/payment-method/disable', wrapAsync(disablePaymentMethod));
// 결제수단 활성화
router.post('/payment-method/enable', wrapAsync(enablePaymentMethod));
// 결제수단 추가
router.post('/payment-method/create', wrapAsync(createPaymentMethod));
// 카테고리 API
router.get('/category', wrapAsync(getCategories));

module.exports = router;

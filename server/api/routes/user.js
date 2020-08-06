const express = require('express');
const router = express.Router();
import { wrapAsync } from '@util';
import { getCategories, getPaymentMethods } from '@controller/user';

// 결제수단 목록 API
router.get('/payment-method/:userKey', wrapAsync(getPaymentMethods));

// 카테고리 API
router.get('/category', wrapAsync(getCategories));

module.exports = router;

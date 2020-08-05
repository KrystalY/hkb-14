const express = require('express');
const router = express.Router();
import { wrapAsync } from '@util';
import { getRecordInMonth, createRecordFromInput } from '@controller/record';
import { validateRecordParameter } from '@validator/record';

router.get(
  '/:year/:month',
  validateRecordParameter,
  wrapAsync(getRecordInMonth),
);

router.post('/', wrapAsync(createRecordFromInput));

module.exports = router;

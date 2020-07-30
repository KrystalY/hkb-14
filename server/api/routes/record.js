const express = require('express');
const router = express.Router();
import {
  wrapAsync
} from '../../util';

import {
  getRecordInMonth
} from '../../controller/record';

import {
  validateRecordParameter
} from '../../validator/record'

router.get('/:year/:month', validateRecordParameter, wrapAsync(getRecordInMonth));
router.get('/:year/:month/:lastEditedAt', validateRecordParameter, wrapAsync(getRecordInMonth));

module.exports = router;
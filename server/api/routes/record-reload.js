const express = require('express');
const router = express.Router();
import { wrapAsync } from '../../util';

import { isReloadInMonth } from '../../controller/record-reload';

import { validateRecordParameter } from '../../validator/record';

router.get(
  '/:year/:month',
  validateRecordParameter,
  wrapAsync(isReloadInMonth),
);

module.exports = router;

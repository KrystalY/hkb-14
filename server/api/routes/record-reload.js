const express = require('express');
const router = express.Router();
import { wrapAsync } from '../../util';
import { isReloadInMonth } from '../../controller/record-reload';
import { validateRecordReloadParameter } from '../../validator/record';

router.get(
  '/:year/:month',
  validateRecordReloadParameter,
  wrapAsync(isReloadInMonth),
);

module.exports = router;

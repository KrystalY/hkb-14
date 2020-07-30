import RecordModel from '@model/record';

async function findByYearAndMonth(year, month) {
  const record = await RecordModel.FindByYearAndMonth(year, month);
  return record;
}

export { findByYearAndMonth };

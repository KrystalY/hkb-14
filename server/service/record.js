import RecordModel from '@model/record';

async function FindByYearAndMonth(year, month) {
  const record = await RecordModel.FindByYearAndMonth(year, month);
  return record;
}

export { FindByYearAndMonth };

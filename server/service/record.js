import RecordModel from '@model/record';

const recordModel = new RecordModel();

async function findByYearAndMonth(year, month) {
  const record = await recordModel.findByYearAndMonth(year, month);
  return changeFormatOfRecord(record);
}

async function getRecentUpdatedDate(year, month) {
  const record = await recordModel.getRecentUpdatedRecord(year, month);
  if (record.length === 0) return '';
  return record[0].EDITED_AT;
}

function changeFormatOfRecord(records) {
  return records;
}

export { findByYearAndMonth, getRecentUpdatedDate };

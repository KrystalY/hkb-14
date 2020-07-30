import RecordModel from '@model/record';

const recordModel = new RecordModel();

async function findByYearAndMonth(year, month) {
  const record = await recordModel.findByYearAndMonth(year, month);
  return changeFormatOfRecord(record);
}

async function getRecentUpdatedDate(year, month) {
  const [record] = await recordModel.getRecentUpdatedRecord(year, month);
  return record.EDITED_AT;
}

function changeFormatOfRecord(records) {
  return records.map((record) => {
    const recordAt = record.record_at;
    return { [recordAt]: record };
  });
}

export { findByYearAndMonth, getRecentUpdatedDate };

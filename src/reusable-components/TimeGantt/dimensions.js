export function getX(timeToScreenMultiplier, date, globalStart, padding) {
  return (
    timeToScreenMultiplier * (date.getTime() - globalStart.getTime()) + padding
  );
}

export function getRecordRectXDimensions(
  record,
  timeToScreenMultiplier,
  globalStart,
  padding
) {
  return {
    x: getX(timeToScreenMultiplier, record.startDate, globalStart, padding),
    width:
      (record.endDate.getTime() -
        globalStart -
        (record.startDate.getTime() - globalStart)) *
      timeToScreenMultiplier,
  };
}

import { getRandomColor } from "../Colors";

function getRecordRectXDimensions(
  record,
  timeToScreenMultiplier,
  globalStart,
  padding
) {
  return {
    x:
      timeToScreenMultiplier *
        (record.startDate.getTime() - globalStart.getTime()) +
      padding,
    width:
      (record.endDate.getTime() -
        globalStart -
        (record.startDate.getTime() - globalStart)) *
      timeToScreenMultiplier,
  };
}

function drawBarLabel(context, x, y, label, color, maxWidth) {
  context.fillStyle = color;
  context.fillText(label, x, y, maxWidth);
}

export function drawBars(
  context,
  data,
  padding,
  timeToScreenMultiplier,
  globalStart,
  barHeight,
  spacing,
  screenWidth
) {
  data.forEach((record, index) => {
    let xDims = getRecordRectXDimensions(
      record,
      timeToScreenMultiplier,
      globalStart,
      padding
    );
    let color = record.color;
    if (!color) {
      color = getRandomColor();
    }
    const y = index * (barHeight + spacing) + padding;

    context.fillStyle = color;
    console.log(xDims);
    context.fillRect(xDims.x, y, xDims.width, barHeight);

    drawBarLabel(context, xDims.x, y, record.label, "black", screenWidth);
  });
}

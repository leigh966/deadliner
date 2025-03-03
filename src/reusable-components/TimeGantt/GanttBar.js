import { getRecordRectXDimensions } from "./dimensions";

function drawBarLabel(context, x, y, label, color, maxWidth) {
  context.font = "14px Ariel";
  context.textAlign = "left";
  context.fillStyle = color;
  context.fillText(label, x, y, maxWidth);
}

export function getColor(index) {
  const colors = ["red", "green", "blue", "yellow", "pink", "orange", "purple"];
  return colors[index % colors.length];
}

function drawBar(
  context,
  record,
  index,
  padding,
  timeToScreenMultiplier,
  globalStart,
  barHeight,
  spacing,
  screenWidth
) {
  let xDims = getRecordRectXDimensions(
    record,
    timeToScreenMultiplier,
    globalStart,
    padding
  );
  let color = record.color;
  if (!color) {
    color = getColor(index);
    console.log(color);
  }
  const y = spacing + index * (barHeight + spacing) + padding;

  context.fillStyle = color;
  console.log(xDims);
  context.fillRect(xDims.x, y, xDims.width, barHeight);

  drawBarLabel(context, xDims.x, y, record.label, "black", screenWidth);

  return {
    top: y,
    bottom: y + barHeight,
    left: xDims.x,
    right: xDims.x + xDims.width,
    record: record,
  };
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
  let colliders = [];
  data.forEach((record, index) => {
    colliders.push(
      drawBar(
        context,
        record,
        index,
        padding,
        timeToScreenMultiplier,
        globalStart,
        barHeight,
        spacing,
        screenWidth
      )
    );
  });
  return colliders;
}

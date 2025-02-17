import { getShortDate } from "../Dates";
import { getX } from "./dimensions";

export function drawCurrent(
  context,
  currentDate,
  timeToScreen,
  padding,
  innerHeight,
  globalStart
) {
  context.fillStyle = "red";
  const x = getX(timeToScreen, currentDate, globalStart, padding);
  context.fillRect(x, padding, 2, innerHeight);
  context.fillText(getShortDate(currentDate), x, padding);
}

export function drawAnnotations(
  context,
  minDate,
  maxDate,
  width,
  height,
  padding,
  notchThickness = 3,
  notchHeight = 10,
  lineThickness = 3,
  labelWidth = 40
) {
  let notch_y = height - padding - lineThickness / 2 - notchHeight / 2;
  let line_y = height - padding - +lineThickness;

  context.font = "14px Ariel";
  context.textAlign = "left";

  context.fillRect(padding, line_y, width - padding * 2, 3);
  context.fillRect(padding, notch_y, notchThickness, notchHeight); // start notch
  context.fillRect(
    width - padding - notchThickness,
    notch_y,
    notchThickness,
    notchHeight
  ); // end notch

  // min date
  context.fillText(
    getShortDate(minDate),
    padding - labelWidth / 2,
    line_y - 20,
    labelWidth
  );

  // max date
  context.fillText(
    getShortDate(maxDate),
    width - padding - labelWidth / 2,
    line_y - 20,
    labelWidth
  );
}

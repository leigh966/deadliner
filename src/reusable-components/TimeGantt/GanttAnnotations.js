import { getShortDate } from "../Dates";

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

  context.fillRect(padding, line_y, width - padding * 2, 3);
  context.fillRect(padding, notch_y, notchThickness, notchHeight); // start notch
  context.fillRect(
    width - padding - notchThickness,
    notch_y,
    notchThickness,
    notchHeight
  ); // end notch

  context.font = "ariel 14px";
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

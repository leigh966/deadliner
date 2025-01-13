"use client";

import styles from "./TimeGantt.module.css";
import { useEffect, useRef } from "react";

function getStart(data) {
  return data.reduce((min, record) => {
    let currentStartDate = new Date(record.startDate);
    return currentStartDate < min ? currentStartDate : min;
  }, new Date());
}

function getEnd(data) {
  return data.reduce((max, record) => {
    let currentEndDate = new Date(record.endDate);
    return currentEndDate > max ? currentEndDate : max;
  }, new Date());
}

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

function getRandomColorNumber() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  return `rgb(${getRandomColorNumber()},${getRandomColorNumber()},${getRandomColorNumber()})`;
}

function drawBarLabel(context, xDims, y, label, color) {
  context.fillStyle = color;
  context.fillText(label, xDims.x, y, xDims.width);
}

function drawBars(
  context,
  data,
  padding,
  timeToScreenMultiplier,
  globalStart,
  barHeight,
  spacing = 10
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
    drawBarLabel(context, xDims, y, record.label, "black");
    context.fillStyle = color;
    console.log(xDims);
    context.fillRect(xDims.x, y, xDims.width, barHeight);
  });
}

function getShortDate(date) {
  return (
    date.getDate() +
    "/" +
    (parseInt(date.getMonth()) + 1) +
    "/" +
    date.getFullYear()
  );
}

function drawAnnotations(
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
  context.fillText(
    getShortDate(minDate),
    padding - labelWidth / 2,
    line_y - 20,
    labelWidth
  );
  context.fillText(
    getShortDate(maxDate),
    width - padding - labelWidth / 2,
    line_y - 20,
    labelWidth
  );
}

export default function TimeGantt({
  width = 400,
  spacing = 10,
  barHeight = null,
  height = 400,
  data,
  padding = 0,
  annotationColor = "grey",
}) {
  const ref = useRef();
  if (!data) {
    throw Error("Data missing");
  }

  const startDate = getStart(data);
  const endDate = getEnd(data);
  const BUILT_IN_PADDING = 50;
  const totalPadding = parseInt(padding) + BUILT_IN_PADDING;
  const timeToScreenMultiplier =
    (width - totalPadding * 2) / (endDate.getTime() - startDate.getTime());

  const internalBarHeight = barHeight
    ? barHeight
    : (height - padding * 2) / (data.length + spacing);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    drawBars(
      context,
      data,
      totalPadding,
      timeToScreenMultiplier,
      startDate,
      internalBarHeight,
      spacing
    );
    context.fillStyle = "grey";
    if (annotationColor) {
      context.fillStyle = annotationColor;
    }
    drawAnnotations(
      context,
      startDate,
      endDate,
      parseInt(width),
      parseInt(height),
      totalPadding
    );
  });

  return (
    <canvas
      className={styles.timeGantt}
      ref={ref}
      width={width}
      height={height}
    />
  );
}

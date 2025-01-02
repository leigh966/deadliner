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

function drawBars(context, data, padding, timeToScreenMultiplier, globalStart) {
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
    context.fillStyle = color;
    console.log(xDims);
    context.fillRect(xDims.x, index * 50 + padding, xDims.width, 40);
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

export default function TimeGantt(props) {
  const ref = useRef();
  if (!props.data) {
    throw Error("Data missing");
  }

  const startDate = getStart(props.data);
  const endDate = getEnd(props.data);
  const BUILT_IN_PADDING = 50;
  const totalPadding = parseInt(props.padding) + BUILT_IN_PADDING;
  const timeToScreenMultiplier =
    (props.width - totalPadding * 2) /
    (endDate.getTime() - startDate.getTime());

  console.log(timeToScreenMultiplier);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    drawBars(
      context,
      props.data,
      totalPadding,
      timeToScreenMultiplier,
      startDate
    );
    context.fillStyle = "grey";
    if (props.annotationColor) {
      context.fillStyle = props.annotationColor;
    }
    drawAnnotations(
      context,
      startDate,
      endDate,
      parseInt(props.width),
      parseInt(props.height),
      totalPadding
    );
  });

  return <canvas className={styles.timeGantt} ref={ref} {...props} />;
}

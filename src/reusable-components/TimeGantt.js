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

function drawBars(context, data, padding, timeToScreenMultiplier, globalStart) {
  data.forEach((record, index) => {
    let xDims = getRecordRectXDimensions(
      record,
      timeToScreenMultiplier,
      globalStart,
      padding
    );
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

function drawAnnotations(context, minDate, maxDate, width, height, padding) {
  let notch_thickness = 3;
  let notch_height = 10;
  let line_thickness = 3;
  let line_bottom = 0;
  let notch_y =
    height - padding - line_bottom - line_thickness / 2 - notch_height / 2;
  let line_y = height - padding - (line_bottom + line_thickness);
  let labelWidth = 40;

  context.fillRect(padding, line_y, width - padding * 2, 3);
  context.fillRect(padding, notch_y, notch_thickness, notch_height); // start notch
  context.fillRect(width - padding - 3, notch_y, notch_thickness, notch_height); // end notch
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
    context.fillStyle = "grey";

    drawBars(
      context,
      props.data,
      totalPadding,
      timeToScreenMultiplier,
      startDate
    );

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

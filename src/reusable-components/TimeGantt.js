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
      parseInt(padding)
    );
    console.log(xDims);
    context.fillRect(xDims.x, index * 50 + parseInt(padding), xDims.width, 40);
  });
}

export default function TimeGantt(props) {
  const ref = useRef();
  if (!props.data) {
    throw Error("Data missing");
  }

  const startDate = getStart(props.data);
  const endDate = getEnd(props.data);

  const timeToScreenMultiplier =
    (props.width - props.padding * 2) /
    (endDate.getTime() - startDate.getTime());

  console.log(timeToScreenMultiplier);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "grey";

    drawBars(
      context,
      props.data,
      parseInt(props.padding),
      timeToScreenMultiplier,
      startDate
    );
  });

  return <canvas className={styles.timeGantt} ref={ref} {...props} />;
}

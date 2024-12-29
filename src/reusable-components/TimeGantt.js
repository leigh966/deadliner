"use client";

import styles from "./TimeGantt.module.css";
import { useEffect, useRef } from "react";

function getStart(data) {
  let minStartDate = new Date();
  data.forEach((record) => {
    let currentStartDate = new Date(record.startDate);
    console.log(currentStartDate);
    if (currentStartDate < minStartDate) {
      minStartDate = currentStartDate;
    }
  });
  return minStartDate;
}

function getEnd(data) {
  let maxEndDate = new Date();
  data.forEach((record) => {
    let currentEndDate = new Date(record.endDate);
    if (currentEndDate > maxEndDate) {
      maxEndDate = currentEndDate;
    }
  });
  return maxEndDate;
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

    props.data.forEach((record, index) => {
      let xDims = getRecordRectXDimensions(
        record,
        timeToScreenMultiplier,
        startDate,
        parseInt(props.padding)
      );
      console.log(xDims);
      context.fillRect(
        xDims.x,
        index * 50 + parseInt(props.padding),
        xDims.width,
        40
      );
    });

    //context.fillRect(10, 10, 100, 100);
  });

  return <canvas className={styles.timeGantt} ref={ref} {...props} />;
}

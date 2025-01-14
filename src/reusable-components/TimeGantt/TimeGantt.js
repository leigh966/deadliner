"use client";

import styles from "./TimeGantt.module.css";
import { useEffect, useRef } from "react";
import { drawBars } from "./GanttBar";
import { drawAnnotations } from "./GanttAnnotations";

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

function drawBackground(context, color, width, height) {
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);
}

export default function TimeGantt({
  width = 400,
  spacing = 20,
  barHeight = null,
  height = 400,
  data,
  padding = 25,
  annotationColor = "grey",
  backgroundColor = "white",
}) {
  const ref = useRef();
  if (!data) {
    throw Error("Data missing");
  }

  const startDate = getStart(data);
  const endDate = getEnd(data);
  const timeToScreenMultiplier =
    (width - padding * 2) / (endDate.getTime() - startDate.getTime());

  const calculatBarHeight = () => {
    const totalSpacing = data.length * spacing;
    const heightRealestate = height - padding * 2 - totalSpacing;
    return heightRealestate / data.length;
  };

  const internalBarHeight = barHeight ? barHeight : calculatBarHeight();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    drawBackground(context, backgroundColor, width, height);

    drawBars(
      context,
      data,
      padding,
      timeToScreenMultiplier,
      startDate,
      internalBarHeight,
      spacing,
      width
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
      padding
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

"use client";

import styles from "./TimeGantt.module.css";
import { useEffect, useRef, useState } from "react";
import { drawBars } from "./GanttBar";
import { drawAnnotations } from "./GanttAnnotations";
import { getRandomColor } from "../Colors";

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

function drawNoDataMessage(message, componentWidth, componentHeight, context) {
  context.fillStyle = "black";
  context.font = "50px Arial";
  context.textAlign = "center";
  context.fillText(
    message,
    componentWidth / 2,
    componentHeight / 2,
    componentWidth
  );
}

export default function TimeGantt({
  width = 400,
  spacing = 20,
  barHeight = null,
  maxBarHeight = 100000000,
  minBarHeight = 1,
  height = 400,
  data,
  padding = 25,
  annotationColor = "grey",
  backgroundColor = "white",
  noDataMessage = "",
}) {
  const ref = useRef();
  if (!data) {
    throw Error("Data missing");
  }
  let myWidth = width;
  let myHeight = height;
  const spaceNeededForAnnotations = 20;

  const [screenSize, setScreenSize] = useState({ width: 192, height: 108 });

  function percentofValue(val, percent) {
    return (val / 100) * percent;
  }

  if (myWidth.toString().includes("%")) {
    myWidth = percentofValue(
      screenSize.width,
      myWidth.toString().split("%")[0]
    );
  }

  if (myHeight.toString().includes("%")) {
    myHeight = percentofValue(
      screenSize.height,
      myHeight.toString().split("%")[0]
    );
  }

  useEffect(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    );
    data.forEach((element) => {
      if (!element.color) {
        element.color = getRandomColor();
      }
    });
  }, []);

  useEffect(() => {
    const startDate = getStart(data);
    const endDate = getEnd(data);
    const timeToScreenMultiplier =
      (myWidth - padding * 2) / (endDate.getTime() - startDate.getTime());

    const calculatBarHeight = () => {
      const totalSpacing = data.length * spacing;
      const heightRealestate =
        myHeight - padding * 2 - totalSpacing - spaceNeededForAnnotations;
      const calculatedHeight = heightRealestate / data.length;
      if (calculatedHeight < minBarHeight) return minBarHeight;
      if (calculatedHeight > maxBarHeight) return maxBarHeight;
      return calculatedHeight;
    };

    const internalBarHeight = barHeight
      ? barHeight
      : calculatBarHeight(spaceNeededForAnnotations);
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    drawBackground(context, backgroundColor, myWidth, myHeight);

    drawBars(
      context,
      data,
      padding,
      timeToScreenMultiplier,
      startDate,
      internalBarHeight,
      spacing,
      myWidth
    );
    context.fillStyle = "grey";
    if (annotationColor) {
      context.fillStyle = annotationColor;
    }
    drawAnnotations(
      context,
      startDate,
      endDate,
      parseInt(myWidth),
      parseInt(myHeight),
      padding
    );

    if (data.length == 0) {
      drawNoDataMessage(noDataMessage, myWidth, myHeight, context);
    }
  });

  return (
    <canvas
      className={styles.timeGantt}
      ref={ref}
      width={myWidth}
      height={myHeight}
    />
  );
}

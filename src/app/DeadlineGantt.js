"use client";

import TimeGantt from "@/reusable-components/TimeGantt/TimeGantt";

export default function DeadlineGantt({ deadlines }) {
  return (
    <TimeGantt
      width="80%"
      height="40%"
      maxBarHeight={100}
      data={deadlines.map((dl) => {
        return {
          startDate: dl.start_date,
          endDate: dl.end_date,
          label: dl.title,
        };
      })}
      onBarClicked={(record) => {
        console.log(record.label);
      }}
      noDataMessage="No Deadlines Yet"
    />
  );
}

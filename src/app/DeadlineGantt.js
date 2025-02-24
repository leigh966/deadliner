"use client";

import TimeGantt from "@/reusable-components/TimeGantt/TimeGantt";
import { useState } from "react";
import EditDeadlineForm from "./EditDeadlineForm";

export default function DeadlineGantt({ deadlines }) {
  const [record, setRecord] = useState(false);
  console.log(deadlines[0]);
  return (
    <>
      <TimeGantt
        width="90%"
        height="80%"
        maxBarHeight={100}
        data={deadlines.map((dl) => {
          return {
            startDate: dl.start_date,
            endDate: dl.end_date,
            label: dl.title,
            recordId: dl.id,
          };
        })}
        onBarClicked={(record) => {
          console.log(record.label);
          setRecord(
            deadlines.find((dl) => {
              return dl.id == record.recordId;
            })
          );
        }}
        noDataMessage="No Deadlines Yet"
      />
      {record && <EditDeadlineForm setVisible={setRecord} record={record} />}
    </>
  );
}

import { padValue } from "./Numbers";

export function getShortDate(date) {
  let day = padValue(date.getDate(), 2);
  let month = padValue(parseInt(date.getMonth()) + 1, 2);
  if (month.length == 1) {
    month = "0" + month;
  }
  const year = date.getFullYear().toString();
  return day + "/" + month + "/" + year;
}

export function getShortDate(date) {
  return (
    date.getDate() +
    "/" +
    (parseInt(date.getMonth()) + 1) +
    "/" +
    date.getFullYear()
  );
}

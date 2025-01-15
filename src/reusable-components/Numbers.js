export function padValue(number, desiredLength) {
  let output = number.toString();
  while (output.length < desiredLength) {
    output = "0" + output;
  }
  return output;
}

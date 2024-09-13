export function formatAccounting(number: number) {
  let formattedNumber = Math.abs(number).toFixed(2);
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number < 0 ? `(${formattedNumber})` : formattedNumber;
}

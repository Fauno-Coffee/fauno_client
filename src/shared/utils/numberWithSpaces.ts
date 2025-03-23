export function numberWithSpaces(x: number | string | undefined): string {
  if (!x) return '-';

  const str = x.toString();
  const [integerPart, decimalPart] = str.split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

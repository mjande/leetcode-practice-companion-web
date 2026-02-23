export function pluralize(amount: number, unit: string) {
  return amount > 1 ? `${amount} ${unit}s` : `${amount} ${unit}`;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
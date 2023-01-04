export function toNumber(value: string, defaultValue: number = 10): number {
  let newValue: number = Number.parseInt(value || String(defaultValue), 10);
  if (Number.isNaN(newValue)) newValue = defaultValue;
  return newValue;
}

// utils/unitConverter.js
export function convertToMl(value, unit) {
  if (unit === "oz") return value * 29.5735;
  return value; // already ml
}

export function convertToOz(value, unit) {
  if (unit === "ml") return value / 29.5735;
  return value; // already oz
}

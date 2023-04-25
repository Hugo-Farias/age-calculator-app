export const checkInvalid = function (
  value: number,
  min: number,
  max: number
): boolean {
  return value > max || value < min;
};

export const checkInvalid = function (
  value: number,
  min: number,
  max: number
): boolean {
  return value > max || value < min;
};

export const calcDate = function (
  date1: Date,
  date2: Date
): { day: number; month: number; year: number } {
  /*
   * calcDate() : Calculates the difference between two dates
   */

  //new date instance
  const date1_time_stamp = new Date(date1).getTime();
  const date2_time_stamp = new Date(date2).getTime();

  let calc;

  //Check which timestamp is greater
  if (date1_time_stamp > date2_time_stamp) {
    calc = new Date(date1_time_stamp - date2_time_stamp);
  } else {
    calc = new Date(date2_time_stamp - date1_time_stamp);
  }

  //Retrieve the date, month and year
  const calcFormatTmp =
    calc.getDate() + "-" + (calc.getMonth() + 1) + "-" + calc.getFullYear();
  //Convert to an array and store
  const calcFormat = calcFormatTmp.split("-");
  //Subtract each member of our array from the default date
  const days_passed = Number(Math.abs(+calcFormat[0]) - 1);
  const months_passed = Number(Math.abs(+calcFormat[1]) - 1);
  const years_passed = Number(Math.abs(+calcFormat[2]) - 1970);

  return { day: days_passed, month: months_passed, year: years_passed };
};

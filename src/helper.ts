export const checkInvalid = function (
  day: number,
  month: number,
  year: number
): string[] | [] {
  const nDay = parseInt(day + "");
  const nMonth = parseInt(month + "");
  const nYear = parseInt(year + "");

  const invalidFields = [];

  const date = new Date(nYear, nMonth - 1, nDay);
  const currDate = new Date();

  if (year > currDate.getFullYear() || year < 1) invalidFields.push("year");
  if (month > 12 || month < 1) invalidFields.push("month");
  if (date.getDate() !== nDay) invalidFields.push("day");

  return invalidFields;
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

export const pluralCheck = function (a: string): "s" | "" {
  if (a === "--") return "s";

  return a + "" === "1" ? "" : "s";
};

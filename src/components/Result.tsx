import "./Result.scss";
import React from "react";
import { calcDate, pluralCheck } from "../helper";
import { formData } from "../typeDef";

interface prop {
  data: formData;
}

const Result: React.FC<prop> = function ({ data }) {
  const { day, month, year }: formData = data;

  const newDate = { day: "--", month: "--", year: "--" };

  if (!isNaN(+(day + month + year))) {
    const date: Date = new Date(+year, +month - 1, +day);
    const currDate: Date = new Date();

    const diffDate = calcDate(date, currDate);

    newDate["year"] = diffDate.year + "";
    newDate["month"] = diffDate.month + "";
    newDate["day"] = diffDate.day + "";
  }

  const dayTxt = "day" + pluralCheck(newDate.day);
  const monthTxt = "month" + pluralCheck(newDate.month);
  const yearTxt = "year" + pluralCheck(newDate.year);

  return (
    <div className="result">
      <h1>
        <span className="number">{newDate.year}</span>
        {yearTxt}
      </h1>
      <h1>
        <span className="number">{newDate.month}</span>
        {monthTxt}
      </h1>
      <h1>
        <span className="number">{newDate.day}</span>
        {dayTxt}
      </h1>
    </div>
  );
};

export default Result;

import "./Result.scss";
import { formData } from "../App";
import React from "react";
import { calcDate } from "../helper";
interface prop {
  data: formData;
}

const Result: React.FC<prop> = function ({ data }) {
  const { day, month, year }: formData = data;

  const newDate = { day: "--", month: "--", year: "--" };

  if (!isNaN(+(day + month + year))) {
    const date: Date = new Date(+year, month - 1, +day);
    const currDate: Date = new Date();

    const diffDate = calcDate(date, currDate);

    newDate["year"] = diffDate.year + "";
    newDate["month"] = diffDate.month + "";
    newDate["day"] = diffDate.day + "";
  }

  return (
    <div className="result">
      <h1>
        <span className="number">{newDate.year}</span>years
      </h1>
      <h1>
        <span className="number">{newDate.month}</span>months
      </h1>
      <h1>
        <span className="number">{newDate.day}</span>days
      </h1>
    </div>
  );
};

export default Result;

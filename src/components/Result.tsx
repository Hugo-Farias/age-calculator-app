import "./Result.scss";
import { formData } from "../App";
import React from "react";

interface prop {
  data: formData;
}

const Result: React.FC<prop> = function ({ data }) {
  const { day, month, year }: formData = data;

  return (
    <div className="result">
      <h1>
        <span className="number">{year}</span>years
      </h1>
      <h1>
        <span className="number">{month}</span>months
      </h1>
      <h1>
        <span className="number">{day}</span>days
      </h1>
    </div>
  );
};

export default Result;

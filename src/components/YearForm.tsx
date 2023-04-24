import "./YearForm.scss";
import React, { FormEvent } from "react";

const formsList = ["day", "month", "year"];

const YearForm = function () {
  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
  };

  const formsJSX = formsList.map((v, i) => {
    return (
      <div key={i} className="label-input">
        <label htmlFor={v}>{v}</label>
        <input type="number" id={v} name={v} required />
      </div>
    );
  });

  return (
    <div className="year-form">
      <form className="" onSubmit={handleSubmit}>
        <div className="form-inputs">{formsJSX}</div>
        <div className="button-container">
          <button className="submit-button" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default YearForm;

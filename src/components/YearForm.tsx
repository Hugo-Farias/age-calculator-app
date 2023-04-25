import "./YearForm.scss";
import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import formData from "App";
import { checkInvalid } from "../helper";

const currentYear = new Date().getFullYear();

const formsList = [
  { name: "day", maxLen: 2, invMsg: "Must be a valid day" },
  { name: "month", maxLen: 2, invMsg: "Must be a valid month" },
  { name: "year", maxLen: 4, invMsg: "Must be in the past" },
];

interface prop {
  formData: (data: formData) => void;
}

const initialState = {
  day: "",
  month: "",
  year: "",
};

const YearForm = function ({ formData }: prop) {
  const [input, setInput] = useState<formData>(initialState);

  const [isInvalid, setIsInvalid] = useState<formData>(initialState);

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    if (isNaN(+value)) return;

    setIsInvalid((prevState) => ({ ...prevState, [name]: "" }));

    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInvalid = function (e: InvalidEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name } = e.target;

    setIsInvalid((prevState) => ({ ...prevState, [name]: "invalid" }));
  };

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const { day, month, year } = {
      day: target["day"].value,
      month: target["month"].value,
      year: target["year"].value,
    };

    const invalidList = checkInvalid(day, month, year);

    invalidList.forEach((v) => {
      setIsInvalid((prevState) => ({ ...prevState, [v]: "invalid" }));
    });

    if (invalidList.length !== 0) return null;

    // if (!formValues) return null;
    //
    formData({ day: day, month: month, year: year });
  };

  const formsJSX = formsList.map((v, i) => {
    return (
      <div key={i} className={`label-input ${isInvalid[v.name]}`}>
        <label htmlFor={v.name}>{v.name}</label>
        <input
          type="text"
          id={v.name}
          name={v.name}
          maxLength={v.maxLen}
          value={input[v.name]}
          onChange={handleChange}
          onInvalid={handleInvalid}
        />
        {isInvalid[v.name] ? <p className="invalid-msg">{v.invMsg}</p> : ""}
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

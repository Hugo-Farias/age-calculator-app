import "./YearForm.scss";
import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import formData from "App";

const currentYear = new Date().getFullYear();

const formsList = [
  { name: "day", min: 1, max: 31, maxLen: 2, invMsg: "Must be a valid day" },
  {
    name: "month",
    min: 1,
    max: 12,
    maxLen: 2,
    invMsg: "Must be a valid month",
  },
  {
    name: "year",
    min: 1,
    max: currentYear - 1,
    maxLen: 4,
    invMsg: "Must be in the past",
  },
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
    const target = e.target;
    const value = e.target.value;

    if (isNaN(+value)) return;

    setInput((prevState) => ({ ...prevState, [target.name]: value }));
  };

  const handleInvalid = function (e: InvalidEvent<HTMLInputElement>) {
    e.preventDefault();
    const name = e.target.name;

    setIsInvalid((prevState) => ({ ...prevState, [name]: "invalid" }));
  };

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target;
    // const name = e.target.name;
    // console.log(name);

    const formValues: formData = { day: "", month: "", year: "" };

    formsList.forEach((value) => {
      formValues[value] = target[value].value;
    });

    // setIsInvalid((prevState) => ({ ...prevState, [name]: "" }));

    formData(formValues);
  };

  const formsJSX = formsList.map((v, i) => {
    return (
      <div key={i} className={`label-input ${isInvalid[v.name]}`}>
        <label htmlFor={v.name}>{v.name}</label>
        <input
          type="text"
          id={v.name}
          name={v.name}
          min={v.min}
          max={v.max}
          maxLength={v.maxLen}
          value={input[v.name]}
          onChange={handleChange}
          onInvalid={handleInvalid}
          required
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

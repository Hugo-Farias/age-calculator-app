import "./YearForm.scss";
import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import formData from "App";
import { checkInvalid } from "../helper";

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
    max: currentYear,
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

    const target = e.target;

    let formValues: formData | null = { day: "", month: "", year: "" };

    formsList.forEach((value) => {
      const name = value.name;

      if (checkInvalid(target[name].value, value.min, value.max)) {
        setIsInvalid((prevState) => ({ ...prevState, [name]: "invalid" }));
        return (formValues = null);
      }

      if (!formValues) return null;

      setIsInvalid((prevState) => ({ ...prevState, [name]: "" }));

      formValues[name] = target[name].value;
    });

    if (!formValues) return null;

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

import "./App.scss";
import YearForm from "./components/YearForm";
import Result from "./components/Result";
import { useState } from "react";
import { formData } from "./typeDef";

function App() {
  const [data, setData] = useState<formData>({
    day: "--",
    month: "--",
    year: "--",
  });

  const handleData = function (formValue: formData) {
    setData(formValue);
  };

  return (
    <div className="app">
      <YearForm formData={handleData} />
      <Result data={data} />
    </div>
  );
}

export default App;

import { FunctionComponent, useRef, useState } from "react";
import { readOnLoad } from "../../helpers";

interface CsvInputFormProps {}

export const CsvInputForm: FunctionComponent<CsvInputFormProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [data, setData] = useState({});

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = inputRef.current?.files ? inputRef.current.files[0] : null;
    if (!file) return;
    reader.onload = (e) => readOnLoad(e);
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input ref={inputRef} type="file" accept=".csv" />
      <button type="submit">Submit</button>
    </form>
  );
};

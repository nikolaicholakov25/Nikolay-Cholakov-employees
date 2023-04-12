import { FunctionComponent, useRef, useState } from "react";
import { readOnLoad } from "../../helpers";
import { IDataByPair } from "../../helpers/types";

interface CsvInputFormProps {
  setData: React.Dispatch<React.SetStateAction<IDataByPair>>;
}

export const CsvInputForm: FunctionComponent<CsvInputFormProps> = ({
  setData,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = inputRef.current?.files ? inputRef.current.files[0] : null;
    if (!file) return;
    reader.onload = (e) => readOnLoad(e, setData);
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input ref={inputRef} type="file" accept=".csv" />
      <button type="submit">Submit</button>
    </form>
  );
};

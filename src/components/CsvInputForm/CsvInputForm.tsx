import { FunctionComponent, useRef } from "react";

interface CsvInputFormProps {}

export const CsvInputForm: FunctionComponent<CsvInputFormProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const getRealValue = (string: string) => {
    return string
      .trim()
      .replace(/\r?\n|\r/g, " ")
      .split(" ");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = inputRef.current?.files ? inputRef.current.files[0] : null;
        if (!file) return;
        reader.onload = function (e) {
          const text: any = e.target?.result;
          const splittedValues: string[] = text.split(", ");
          const result: string[] = [];
          for (let i = 0; i < splittedValues.length; i++) {
            const currentEntry = splittedValues[i];
            const trueValue = getRealValue(currentEntry);
            trueValue.map((value: string) => result.push(value));
          }
          console.log(result);
        };
        reader.readAsText(file);
      }}
    >
      <input ref={inputRef} type="file" accept=".csv" />
      <button type="submit">Submit</button>
    </form>
  );
};

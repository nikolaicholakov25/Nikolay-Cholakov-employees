import React, { useState } from "react";
import "./App.css";
import { CsvInputForm } from "./components";
import { IDataByPair } from "./helpers/types";

function App() {
  const [data, setData] = useState<IDataByPair>({});

  const dataToArray = Object.values(data);
  console.log(dataToArray);

  return (
    <div>
      <CsvInputForm setData={setData} />
      <table>
        <thead>
          <tr>
            <th>Empoyee ID # 1</th>
            <th>Empoyee ID # 2</th>
            <th>Project ID</th>
            <th>Days Together</th>
          </tr>
        </thead>
        <tbody>
          {dataToArray.map((entry) =>
            entry.map(({ emp1, emp2, projectId, timeTogether }) => {
              if (timeTogether === 0) return null;

              return (
                <tr key={`${emp1}-${emp2}-${projectId}`}>
                  <td>{emp1}</td>
                  <td>{emp2}</td>
                  <td>{projectId}</td>
                  <td>{timeTogether} Days</td>
                </tr>
              );
            })
          )}

          {/* <tr>
            <td>1</td>
            <td>2</td>
            <td>21</td>
            <td>10 days</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default App;

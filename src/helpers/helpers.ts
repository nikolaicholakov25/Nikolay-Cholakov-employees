export const getRealValue = (string: string) => {
  return string
    .trim()
    .replace(/\r?\n|\r/g, " ")
    .split(" ");
};

interface IDataEntry {
  employeeId: string;
  projectId: string;
  dateFrom: number;
  dateTo: number;
}

interface IDataByProject {
  [key: string]: IDataEntry[];
}

export const readOnLoad = (e: ProgressEvent<FileReader>) => {
  const text: any = e.target?.result;
  const splittedValues: string[] = text.split(", ");
  const result: string[] = [];

  for (let i = 0; i < splittedValues.length; i++) {
    const currentEntry = splittedValues[i];
    const trueValue = getRealValue(currentEntry);
    trueValue.map((value: string) => result.push(value));
  }

  const numberOfDataEntries = result.length / 4;
  const dataByProject: IDataByProject = {};
  for (let i = 0; i < numberOfDataEntries; i++) {
    const DataEntry = result.splice(0, 4);
    const employeeId = DataEntry[0];
    const projectId = DataEntry[1];
    const dateFrom = dateInDays(DataEntry[2]);
    const dateTo = dateInDays(DataEntry[3]);

    const userEntry = {
      employeeId,
      projectId,
      dateFrom,
      dateTo,
    };

    if (dataByProject[projectId] === undefined) {
      dataByProject[projectId] = [userEntry];
    } else {
      dataByProject[projectId].push(userEntry);
    }
  }

  getDataByPair(dataByProject);
};

const dateInDays = (date: string) => {
  if (date === "NULL")
    return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) + 1;
  return Math.floor(new Date(date).getTime() / (1000 * 60 * 60 * 24)) + 1;
};

const getOverlappingDays = (person1: IDataEntry, person2: IDataEntry) => {
  const overlapStartDay =
    person1.dateFrom > person2.dateFrom ? person1.dateFrom : person2.dateFrom;

  const overlapFinishDay =
    person1.dateTo > person2.dateTo ? person2.dateTo : person1.dateTo;

  return overlapFinishDay - overlapStartDay < 0
    ? 0
    : overlapFinishDay - overlapStartDay;
};

const getDataByPair = (data: IDataByProject) => {
  const dataByPair: any = {};
  const dataToArray = Object.values(data);

  for (const project of dataToArray) {
    const emp1 = project[0];
    const emp2 = project[1];

    const dataEntry = {
      projectId: emp1.projectId,
      emp1: emp1.employeeId,
      emp2: emp2.employeeId,
      timeTogether: getOverlappingDays(emp1, emp2),
    };

    if (dataByPair[`${emp1.employeeId}-${emp2.employeeId}`] === undefined) {
      dataByPair[`${emp1.employeeId}-${emp2.employeeId}`] = [dataEntry];
    } else {
      dataByPair[`${emp1.employeeId}-${emp2.employeeId}`].push(dataEntry);
    }
  }

  console.log(dataByPair);
};

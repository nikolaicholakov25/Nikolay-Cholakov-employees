export interface IDataEntry {
  employeeId: string;
  projectId: string;
  dateFrom: number;
  dateTo: number;
}

export interface IDataByProject {
  [key: string]: IDataEntry[];
}

export interface IPair {
  emp1: string;
  emp2: string;
  projectId: string;
  timeTogether: number;
}

export interface IDataByPair {
  [key: string]: IPair[];
}

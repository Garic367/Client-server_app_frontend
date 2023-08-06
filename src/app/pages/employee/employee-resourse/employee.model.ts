export interface Employee {
  sortOrder: string;
  id: number;
  name: string;
  salary: number;
  department:{name:string,id:number};
  role: string;
  onVacation:boolean;


}




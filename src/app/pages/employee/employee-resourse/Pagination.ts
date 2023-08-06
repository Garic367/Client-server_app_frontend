export interface Pagination<Employee>{
  data:Employee[];
  pageSize:number;
  pageNumber:number;
  totalCount:number;
  totalPages:number;
}

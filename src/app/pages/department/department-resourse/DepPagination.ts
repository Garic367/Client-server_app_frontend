export interface Pagination<Department>{
  data:Department[];
  pageSize:number;
  pageNumber:number;
  totalPages:number;
  totalCount:number;
}

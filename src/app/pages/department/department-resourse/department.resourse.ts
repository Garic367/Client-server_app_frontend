import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentResourse {
  private url = 'http://localhost:8080/department';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.url}`);
  }
  createDepartment(department: Department){
    return this.http.post<Department>(`${this.url}`, department);
  }
  updateDepartment(id?: number ,department?: Department): Observable<Department>{
    return this.http.put<Department>(`${this.url}/${id}`,department)
  }

  deleteDepartment(id: number): Observable<Department>{
    return this.http.delete<Department>(`${this.url}/${id}`)
  }

  hasEmployees(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/${id}/has-employees`);
  }

  getDepartmentByPagination(
    pageNumber: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>,
  ): Observable< any > {
    let params = new HttpParams()
      .append('pageNumber', `${pageNumber}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });

    return this.http
      .get<{ department: Department[] }>(`${this.url}/pag`, { params })
      .pipe(catchError(() => of({ department: [] })));
  }


}

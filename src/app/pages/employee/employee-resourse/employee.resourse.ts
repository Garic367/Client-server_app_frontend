import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { Employee } from './employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeResourse {
  private url = 'http://localhost:8080/employee'; // Замените на URL вашего Java-бэкенда

  constructor(private http: HttpClient) {
  }

  createEmployee(employee: Employee): Observable<any> {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Employee>(this.url, JSON.stringify(employee), {headers: myHeaders});
  }

  updateEmployee(id?: number, employee?: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, employee)
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`)
  }

  getEmployeesByPagination(
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
      .get<{ employee: Employee[] }>(`${this.url}/pag`, { params })
      .pipe(catchError(() => of({ employee: [] })));
  }
}

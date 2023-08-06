import {Component, OnInit, } from '@angular/core';
import { Employee } from '../employee-resourse/employee.model';
import { EmployeeResourse } from '../employee-resourse/employee.resourse';
import { NzTableQueryParams} from "ng-zorro-antd/table";
import {Pagination} from "../employee-resourse/Pagination";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'nz-demo-table-row-selection-and-operation',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isVisible = false;
  pageNumber = 1;
  sortOrder = 'ascend';
  pageSize = 10;
  sortField = 'id';
  totalItems = 1;
  searchValue = '';
  visible = false;
  showCreateModal=false;
  constructor(private employeeResourse: EmployeeResourse,private notification: NzNotificationService,private modal:NzModalService) {
  }

  ngOnInit() {
    this.loadDataFromServer(this.pageNumber, this.pageSize, this.sortField, this.sortOrder, []);
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>,
  ): void {
    this.employeeResourse.getEmployeesByPagination(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(
      (pagination:Pagination<any>) => {
      this.totalItems = pagination.totalCount; // mock the total data here
      this.employees = pagination.data;
      }
    );
    }


  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  deleteEmployee(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this department?',
      nzContent: '<b>This action cannot be undone.</b>',
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.employeeResourse.deleteEmployee(id).subscribe(() => {
          this.employees = this.employees.filter((employee) => employee.id !== id);
        });
        this.deleteNotification('success');
      },
      nzCancelText: 'No'
    });
  }
  deleteNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'Employee was successfully removed'
    );
  }

  showModal(employee:Employee): void {
    this.selectedEmployee = employee;
    this.isVisible = true;
  }

  handleModalClose(employeeToUpdate: Employee| null): void {
    if (employeeToUpdate) {
      const index = this.employees.findIndex(employee => employee.id === employeeToUpdate.id);

      if (index !== -1) {
        this.employees[index].name = employeeToUpdate.name;
        this.employees[index].salary = employeeToUpdate.salary;
        this.employees[index].role = employeeToUpdate.role;
        this.employees[index].onVacation = employeeToUpdate.onVacation;

        this.employeeResourse.updateEmployee(employeeToUpdate.id, employeeToUpdate).subscribe(data => {
          console.log(data);
        });
      }
    }
    this.isVisible = false;
  }


searchByName(): void {
  this.visible = false;
  this.employees = this.employees.filter((employee: Employee) => employee.name.indexOf(this.searchValue) !== -1);
}

  reset(): void {
    this.searchValue = '';
    this.loadDataFromServer(this.pageNumber,this.pageSize,this.sortField,this.sortOrder,[]);
    this.visible = false;
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    console.log("opened");
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.loadDataFromServer(this.pageNumber, this.pageSize, this.sortField, this.sortOrder, [])
  }

  createEmployee(employee:Employee): void {
    this.employees.push(employee);
    this.showCreateModal = false;
    this.loadDataFromServer(this.pageNumber,this.pageSize,this.sortField,this.sortOrder,[]);
    console.log("created");
  }

}

import {Component, OnInit} from '@angular/core';
import { Department } from '../department-resourse/department.model';
import { DepartmentResourse } from '../department-resourse/department.resourse';
import {Pagination} from "../../employee/employee-resourse/Pagination";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department: Department[] = [];
  selectedDepartment: Department | null = null;
  isVisible = false;
  pageNumber = 1;
  sortOrder = 'ascend';
  pageSize = 5;
  sortField = 'id';
  totalItems = 1;
  showCreateModal = false;

  constructor(private departmentResourse: DepartmentResourse,private notification: NzNotificationService, private modal:NzModalService) {
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

    this.departmentResourse.getDepartmentByPagination(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(
      (pagination:Pagination<any>) => {
        this.totalItems = pagination.totalCount; // mock the total data here
        this.department = pagination.data;
      }
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {


    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }
  deleteNotificationSuccess(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Department was successfully removed'
    );
  }
  deleteNotificationError(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Department can not remove because has employees'
    );
  }


  deleteDepartment(id: number): void {
    this.departmentResourse.hasEmployees(id).subscribe((hasEmployees) => {
      if (hasEmployees) {
       this.deleteNotificationError('error');
       return;
      }

      this.modal.confirm({
        nzTitle: 'Are you sure to delete this department?',
        nzContent: '<b>This action cannot be undone.</b>',
        nzOkText: 'Yes',
        nzOnOk: () => {
          this.departmentResourse.deleteDepartment(id).subscribe(() => {
            this.department = this.department.filter((department) => department.id !== id);
            this.deleteNotificationSuccess('success');
          });
        },
        nzCancelText: 'No',
      });
    });
  }
  showModal(department: Department): void {
    this.selectedDepartment = department;
    this.isVisible = true;
  }

  handleModalClose(departmentToUpdate: Department | null): void {
    if (departmentToUpdate) {
      const index = this.department.findIndex(department => department.id === departmentToUpdate.id);
      if (index !== -1) {
        this.department[index].name = departmentToUpdate.name;
        this.departmentResourse.updateDepartment(departmentToUpdate.id, departmentToUpdate).subscribe(data => {
          console.log(data);
        });
      }
    }
    this.isVisible = false;
  }


  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    console.log("closeCreateModal")
    this.showCreateModal = false;
    this.loadDataFromServer(this.pageNumber, this.pageSize, this.sortField, this.sortOrder, [])
  }

  createDepartment(department: Department): void {
    this.department.push(department);
    this.showCreateModal = false;
  }

}


import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department} from "../department-resourse/department.model";
import {DepartmentResourse} from "../department-resourse/department.resourse";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs";

@Component({
  selector: 'add-department',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit{
  @Input() isVisibleCreate:boolean = false;
  @Output() closeCreateModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() createDepartment: EventEmitter<Department> = new EventEmitter<Department>();

  form: FormGroup;
data:any;
  constructor( private departmentResourse:DepartmentResourse, private notification:NzNotificationService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    });
  }

  handleCreateOk(): void {
    this.data = this.form.value;
    console.log(this.data);

    if (this.form.valid) {
      this.departmentResourse.createDepartment(this.data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 500) {
              this.createNotificationError('error');
            } else {
              console.log(error);
              this.createNotificationError('error');
            }
            throw error;
          })
        )
        .subscribe(data => {
          console.log(data);
          this.createNotificationSuccess('success');
          this.closeCreateModal.emit(this.createDepartment);
          this.form.reset();
        });
    }
  }

  createNotificationSuccess(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Department was successfully created'
    );
  }
  createNotificationError(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Department with this name already exist'
    );
  }

  handleCreateCancel(): void {
    this.isVisibleCreate = false;
    this.closeCreateModal.emit();
    this.form.reset();
  }

  ngOnInit(): void {
  }

}

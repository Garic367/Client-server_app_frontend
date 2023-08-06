import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EmployeeResourse } from '../employee-resourse/employee.resourse';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Employee} from "../employee-resourse/employee.model";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {DepartmentResourse} from "../../department/department-resourse/department.resourse";
import {Department} from "../../department/department-resourse/department.model";


@Component({
  selector: 'add-employee',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @Input() isVisibleCreate = false;
  @Output() closeCreateModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() createEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  form: FormGroup;
  data:any;
  department:Department[] = [];

  ngOnInit(): void {
    this.loadDepartments();
  }
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (department: Department[]) => {
        this.department= department;
      },
    );
  }

  constructor(private departmentService:DepartmentResourse, private employeeResourse:EmployeeResourse, private notification:NzNotificationService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      salary: new FormControl('', [Validators.required, Validators.min(100),Validators.max(1000)]),
      role: new FormControl('', [Validators.required]),
      onVacation: new FormControl('False',[Validators.required]),
      department: new FormControl('',[Validators.required])
    });
  }

  handleCreateOk(): void {
    this.data = this.form.value;
    console.log(this.data);
    const departmentId = this.form.get('department')?.value;
    this.data.department = {id: departmentId};

    if (this.form.valid) {
      this.employeeResourse.createEmployee(this.data)
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
          this.closeCreateModal.emit(this.createEmployee);
          this.form.reset();
        });
    }
  }

  createNotificationSuccess(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Employee was successfully created'
    );
  }

  createNotificationError(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Employee with this name already exist '
    );
  }

  handleCreateCancel(): void {
    this.isVisibleCreate = false;
    this.closeCreateModal.emit();
    this.form.reset();
    console.log('handelCreateCancel');
  }
}



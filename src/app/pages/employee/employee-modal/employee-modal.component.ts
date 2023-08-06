import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Employee} from "../employee-resourse/employee.model";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Department} from "../../department/department-resourse/department.model";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeResourse} from "../employee-resourse/employee.resourse";


@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() selectedEmployee: Employee | null = null;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  constructor( private notification: NzNotificationService, private employeeResource:EmployeeResourse) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
      salary: new FormControl('', [Validators.required, Validators.min(100),Validators.max(1000)]),
      role: new FormControl('', [Validators.required]),
      onVacation: new FormControl('', [Validators.required]),

    });
  }

 ngOnChanges(changes:SimpleChanges): void {
    if (changes['selectedEmployee'] && this.selectedEmployee) {
      this.form.patchValue({
        name: this.selectedEmployee['name'],
        salary: this.selectedEmployee['salary'],
        role: this.selectedEmployee['role'],
        onVacation: this.selectedEmployee['onVacation'],
      });
    }
  }
  updateNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'Employee was successfully updated'
    );
  }
  updateNotificationError(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'Employee with this name already exist'
    );
  }

    handleOk(): void {
        if (this.form.valid) {
            const employeeToUpdate: Employee = {
                ...this.form.value,
                id: this.selectedEmployee?.id,
            };

            this.employeeResource.updateEmployee(this.selectedEmployee?.id, employeeToUpdate)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 500) {
                            this.updateNotificationError('error');
                        }
                        throw error;
                    })
                )
                .subscribe(data => {
                    console.log(data);
                    this.closeModal.emit(employeeToUpdate);
                    this.updateNotification('success');
                    this.form.reset();
                });
        }
    }


  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.closeModal.emit(null);
  }
}




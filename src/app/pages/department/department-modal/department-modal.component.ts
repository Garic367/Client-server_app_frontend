import {Component, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department} from "../department-resourse/department.model";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { HttpErrorResponse } from "@angular/common/http";
import {catchError} from "rxjs";
import {DepartmentResourse} from "../department-resourse/department.resourse";

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.css']
})
export class DepartmentModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() selectedDepartment: Department | null = null;
  @Output() closeModal: EventEmitter<Department | null> = new EventEmitter();

  form: FormGroup;

  constructor(private notification: NzNotificationService, private departmentResource:DepartmentResourse) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(30)]),
    });
  }

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['selectedDepartment'] && this.selectedDepartment) {
      this.form.patchValue({
        name: this.selectedDepartment['name'],
      });
    }
  }

  /*handleOk(): void {

    if (this.selectedDepartment) {
      const departmentToUpdate: Department = {
        ...this.form.value,
        id: this.selectedDepartment.id,
      };


      this.closeModal.emit(departmentToUpdate);
      if(this.form.valid) {

        this.updateNotification('success')
        this.form.reset();
      }
    }
  }*/

  handleOk(): void {
    if (this.form.valid) {
      const departmentToUpdate: Department = {
        ...this.form.value,
        id: this.selectedDepartment?.id,
      };

      this.departmentResource.updateDepartment(this.selectedDepartment?.id, departmentToUpdate)
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
          this.closeModal.emit(departmentToUpdate);
          this.updateNotification('success');
          this.form.reset();
        });
    }
  }


  updateNotification(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Department was successfully updated'
    );
  }
  updateNotificationError(type: string): void {
    this.notification.create(
      type,
      'Notification',
      'Department with this name already exist'
    );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.closeModal.emit(null);
    this.form.reset();
  }
}

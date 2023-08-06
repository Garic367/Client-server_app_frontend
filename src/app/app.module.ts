import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {EmployeeComponent} from "./pages/employee/employee-list/employee.component";
import {EmployeeCreateComponent} from "./pages/employee/employee-create/employee-create.component";
import {DepartmentComponent} from "./pages/department/department-list/department.component";
import {DepartmentCreateComponent} from "./pages/department/department-create/department-create.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzModalModule} from "ng-zorro-antd/modal";
import {DepartmentModalComponent} from "./pages/department/department-modal/department-modal.component";
import {EmployeeModalComponent} from "./pages/employee/employee-modal/employee-modal.component";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeCreateComponent,
    DepartmentComponent,
    DepartmentCreateComponent,
    DepartmentModalComponent,
    EmployeeModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDropDownModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzModalModule,
    NzRadioModule,
    NzIconModule,
    NgOptimizedImage,
    NzNotificationModule,
    NzSelectModule,


  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

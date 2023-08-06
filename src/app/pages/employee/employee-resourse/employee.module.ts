import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';

import {NgForOf} from "@angular/common";




@NgModule({
  imports: [EmployeeRoutingModule, NgForOf],
  declarations: [],
  exports: []
})
export class EmployeeModule {

}

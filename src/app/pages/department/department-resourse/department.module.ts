import { NgModule } from '@angular/core';

import { DepartmentRoutingModule } from './department-routing.module';

import {NgForOf} from "@angular/common";


@NgModule({
  imports: [DepartmentRoutingModule, NgForOf],
  declarations: [],
  exports: []
})
export class DepartmentModule { }

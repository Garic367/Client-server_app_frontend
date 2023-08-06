import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeCreateComponent} from "./pages/employee/employee-create/employee-create.component";
import {DepartmentCreateComponent} from "./pages/department/department-create/department-create.component";
import {DepartmentModalComponent} from "./pages/department/department-modal/department-modal.component";
import {EmployeeModalComponent} from "./pages/employee/employee-modal/employee-modal.component";

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/employee' },
  { path: '', pathMatch: 'full', redirectTo: '/department' },

  { path: 'employee', loadChildren: () => import('./pages/employee/employee-resourse/employee.module').then(m => m.EmployeeModule) },
  { path: 'department', loadChildren: () => import('./pages/department/department-resourse/department.module').then(m => m.DepartmentModule) },

  { path: 'add-employee',component: EmployeeCreateComponent},
  { path: 'add-department',component: DepartmentCreateComponent},
  { path: 'app-department-modal',component: DepartmentModalComponent},
  { path: 'app-employee-modal',component: EmployeeModalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

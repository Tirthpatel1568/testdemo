import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubDepartmentComponent } from './sub-department.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageSubDepartmentComponent } from './manage-sub-department/manage-sub-department.component';
import { ViewSubDepartmentComponent } from './view-sub-department/view-sub-department.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SubDepartmentComponent
  }
];

@NgModule({
  declarations: [
    SubDepartmentComponent,
    ManageSubDepartmentComponent,
    ViewSubDepartmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SubDepartmentModule { }

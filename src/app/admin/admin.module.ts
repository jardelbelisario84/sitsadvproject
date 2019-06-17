import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MomentModule } from 'angular2-moment';
import { BlankComponent } from './blank/blank.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BlankComponent,
    HomeComponent,
    AdminComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MomentModule
  ]
})
export class AdminModule { }

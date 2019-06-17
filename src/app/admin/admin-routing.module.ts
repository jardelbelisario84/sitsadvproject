import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { BlankComponent } from './blank/blank.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [

  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'dados-para-site',
        component: BlankComponent
      },
      { 
        path: '**', component: ErrorComponent
      }
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

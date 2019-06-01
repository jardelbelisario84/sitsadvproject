import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './site/site.module#SiteModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuardService]},
  { path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

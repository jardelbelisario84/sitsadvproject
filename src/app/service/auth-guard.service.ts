import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authServive: AuthServiceService,
    private router: Router
  ) { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authServive.isAuthenticated()
      .pipe(tap(b => {
        if (!b)
          this.router.navigateByUrl('/login');
      }))
  }


  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  //   if (true) {
  //     this.router.navigate(['/admin/dashboard']);
  //     return true;
  //   }
  //   return false;
  // }

  // private isAuthenticated: boolean = false;
  // canActivate() {
  //   if( this.isAuthenticated ) {
  //     this.router.navigateByUrl('/admin/dashboard');
  //   }
  //   return false

  // }



}

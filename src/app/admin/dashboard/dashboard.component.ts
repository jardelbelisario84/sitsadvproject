import { Component, OnInit, NgZone } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import * as  moment from 'moment';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: any = {};
  isAuthenticated: boolean;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private zone: NgZone) {
    
    
  }

  ngOnInit() {
    this.authService.getUser()
    .subscribe(user => {
      this.usuario = user;
    });

   
  }


  lougout() {
    this.authService.lougout()
    this.router.navigateByUrl('/login')
  }


  
  openLinkBoleto() {
    window.open(this.usuario.urlBoleto, '_blank');
    // setTimeout(() => {
    //   this.router.navigate(['/']);
    // }, 2000);

  }

}

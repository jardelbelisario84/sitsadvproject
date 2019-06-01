import { Component, OnInit, NgZone } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario: any = {};

  constructor(private authService: AuthServiceService, private router: Router, private zone: NgZone) { }

  ngOnInit() {

    this.authService.getUser()
      .subscribe(user => {

        (user) ? this.usuario = user : this.usuario = {};

      })

  }


  lougout() {
    this.authService.lougout();
    this.router.navigateByUrl('login')
  }

}

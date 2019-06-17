import { Component, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

declare var $: any

@Component({
    selector: 'app-admin-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

    usuario: any = {};
    isAuthenticated: boolean;

    constructor(
        private authService: AuthServiceService,
        private router: Router,
        private zone: NgZone) {


    }


    ngAfterViewInit() {
        // Toggle the side navigation
        $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').collapse('hide');
            };
        });

        // Close any open menu accordions when window is resized below 768px
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $('.sidebar .collapse').collapse('hide');
            };
        });

        // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
        $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
            if ($(window).width() > 768) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;
                this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                e.preventDefault();
            }
        });
    }

    ngOnInit() {
        this.authService.getUser()
            .subscribe(user => {
                this.usuario = user;
            });

        window.scrollTo(0, 0);

    }


    lougoutUser() {
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

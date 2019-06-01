import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  msgError: string;
  loadingPage: boolean = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService) { }

  loginFormBld = this.fb.group({

    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required]],

  });

  ngOnInit() {


  
  }



  onSubmitLogin(){
    this.loadingPage = true;
    let email = this.loginFormBld.value.email;
    let password = this.loginFormBld.value.password;
    this.authService.login(email, password)
    .subscribe(
      (object) => {
        console.log("logado")
        this.router.navigate(['/admin/dashboard']);
        this.loadingPage = false;
    },
    (err) => { 
      this.loadingPage = false;
      this.msgError = 'Credenciais Inválidas ou usuário não está registardo.';
      console.log("Erro ao logar", err)
    });
    
  }

}

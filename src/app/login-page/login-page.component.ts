import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import * as toastr from 'toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  msgError: string;
  loadingPage: boolean = false;
  urlBaseImg: string;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService) { }

  loginFormBld = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],

  });




  ngOnInit() {
    if (!environment.production) {
      this.urlBaseImg = '../../../assets/imagens/';
    } else {
      this.urlBaseImg = 'assets/imagens/';
    }

  }

  toatrSuccess(titulo: string, mensagem: string) {
    return toastr.success(mensagem, titulo, {
      positionClass: "toast-top-center",
      progressBar: true,
      closeButton: true,
    })
  }

  toatrError(titulo: string, mensagem: string) {
    return toastr.error(mensagem, titulo, {
      positionClass: "toast-bottom-center",
      progressBar: true,
      closeButton: true,
    })
  }



  onSubmitLogin() {
    this.loadingPage = true;
    let email = this.loginFormBld.value.email;
    let password = this.loginFormBld.value.password;
    this.authService.login(email, password)
      .subscribe(
        (object) => {
          console.log("logado")
          console.log(object)
          this.router.navigate(['/admin']);
          this.toatrSuccess('Bem vindo(a) ' + object['firstName'], 'Login realizado com sucesso.')
        },
        (err) => {
          this.toatrError('OPSS!', 'Credenciais Inválidas ou usuário não está registardo.');
          this.loadingPage = false;
          // this.toatrError('OPSS!', 'Credenciais Inválidas ou usuário não está registardo.')
          this.msgError = 'Credenciais Inválidas ou usuário não está registardo.';
          console.log("Erro ao logar", err)
        });

  }


}

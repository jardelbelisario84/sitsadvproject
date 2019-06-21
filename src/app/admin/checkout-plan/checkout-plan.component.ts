import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validacoes/generic-validator';

@Component({
  selector: 'app-checkout-plan',
  templateUrl: './checkout-plan.component.html',
  styleUrls: ['./checkout-plan.component.css']
})
export class CheckoutPlanComponent implements OnInit {

  credicardForm = this.fb.group({
    //DADOS REFERENTE AO CARTÃO DE CRÉDITO
    nomePortadorCard: ['', [Validators.required]],
    numCard: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(16),
      Validators.maxLength(16)]],                           // ex: '4111111111111111'
    mesValidadeCard: ['', [Validators.required]],                   // ex: '12',
    anoValidadeCard: ['', [Validators.required]],                   // ex: '2030',
    codSegCard: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)]],                        // ex: '123',
    bandCard: [''],                                                 // preenchido dinamicamente
    hashCard: [''],                                                 // preenchido dinamicamente
    sendHash: [''],                                                 // preenchido dinamicamente
    parcelas: [[''], [Validators.required]],                        // preenchido dinamicamente   
    cpfCard: ['', [
      Validators.required,
      GenericValidator.isValidCpf(),
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],
    telefoneCard: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],                  // preenchido dinamicamente


    nascimento: ['', [Validators.required]],



  })


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }


  onSubmit(event) {
    console.log(event)
  }


}

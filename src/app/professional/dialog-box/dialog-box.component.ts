import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Professional } from '../model/professional';
import { Service } from '../model/service';
import { telefoneValidator } from '../util/telefone-invalido.directive';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  localData: any;
  professional: FormGroup;
  services: Service[];

  phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Professional,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

    this.services = this.getServices();

    this.action = this.data.action; // Plus property to define action

    this.professional = this.formBuilder.group({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.phone, [Validators.required, telefoneValidator(/\(\d\d\)\d\d\d\d\d\-\d\d\d\d/)]),
      rating: new FormControl(this.data.rating),
      services: new FormControl(this.data.services),
      enable: new FormControl(this.data.enable)
    });
  }

  getServices(): Service[] {
    const services: Service[] = [];

    services.push({id: 1, nome: 'Serviço1', duracao: 0, valor: 0, idSalao: 0, status: 0});
    services.push({id: 1, nome: 'Serviço2', duracao: 0, valor: 0, idSalao: 0, status: 0});
    services.push({id: 1, nome: 'Serviço3', duracao: 0, valor: 0, idSalao: 0, status: 0});
    services.push({id: 1, nome: 'Serviço4', duracao: 0, valor: 0, idSalao: 0, status: 0});
    services.push({id: 1, nome: 'Serviço5', duracao: 0, valor: 0, idSalao: 0, status: 0});

    return services;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.professional.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  get name() {
    return this.professional.get('name') as FormControl;
  }

  get email() {
    return this.professional.get('email') as FormControl;
  }

  get phone() {
    return this.professional.get('phone') as FormControl;
  }

  getMsgRequired() {
    return 'Campo obrigatório';
  }

  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.nome === item2.nome : item1 === item2;
  }
}

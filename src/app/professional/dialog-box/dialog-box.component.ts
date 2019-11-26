import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Professional } from '../model/professional';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  localData: any;
  professional: FormGroup;

  phoneMask = ['(', /\d/, /\d/, ')', /\d/, '.', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Professional,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

    console.log(data);
    this.localData = {...data};
    this.action = this.localData.action;

    this.professional = this.formBuilder.group({
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.phone, [Validators.required, Validators.pattern(/\(\d\d\)\d\.\d\d\d\d\-\d\d\d\d/)]),
      rating: new FormControl(this.data.rating, Validators.required),
      services: new FormControl(this.data.services, Validators.required)
    });
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}

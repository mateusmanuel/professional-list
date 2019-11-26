import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';

import { ProfessionalComponent } from './professional.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    ProfessionalComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
})
export class ProfessionalModule { }

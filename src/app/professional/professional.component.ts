import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Professional } from './model/professional';
import { Service } from './model/service';

const ELEMENT_DATA: Professional[] = [
  {id: 1, name: 'Éber Moreira', email: 'eber@unb.br', phone: '3107-0023', rating: 5.0, enable: true, services: []}
];

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'rating', 'enable', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {

  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Atualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Excluir') {
        this.deleteRowData(result.data);
      }
    });
  }

  changeEnable(element) {
    element.enable = !element.enable;
  }

  addRowData(rowObj) {
    // Call to service
    console.log(rowObj);
    this.dataSource.push({
      id: this.dataSource[this.dataSource.length - 1].id + 1,
      name: rowObj.name,
      phone: rowObj.phone,
      email: rowObj.email,
      rating: rowObj.rating,
      enable: true,
      services: rowObj.services
    });
    this.table.renderRows();

  }

  updateRowData(rowObj) {
    // Call to service
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        value.phone = rowObj.phone;
        value.email = rowObj.email;
        value.rating = rowObj.rating;
        value.enable = rowObj.enable;
        value.services = rowObj.services;
      }
      return true;
    });
  }

  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowObj.id;
    });
  }

}

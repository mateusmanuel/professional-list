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
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: rowObj.name
    });
    this.table.renderRows();

  }
  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
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

import { Component, Output, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AddContactComponent } from '../add-contact.component';

export interface DialogData {
  id?: string
  name: string
  number: string;
  operationType: string;
}

@Component({
  selector: 'dialog-add-contact',
  templateUrl: './dialogBtn.component.html',
  standalone: true,
    imports: [MatButtonModule, CommonModule, MatIconModule],
  styleUrl: './dialogBtn.component.css'
})
export class DialogAddContact {
  @Input() name: string = ''
  @Input() number: string = ''
  @Output() addContact = new EventEmitter<{ name: string, number: string }>()
  @Input() operationType: string = ''

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      data: {name: this.name, number: this.number, operationType: this.operationType},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
        this.addContact.emit(result);
    });
    }
    
   
}

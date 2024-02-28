import { Component, inject, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogData } from './dialogBtn/dialogBtn.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,  MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  addContactForm!: FormGroup;
  route = inject(Router)
  formData: {name: string, number: string} = {name: '', number: ''}


    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
      this._createForm();
      // this.formData.name = data.name
  } 

   onNoClick(): void {
    this.dialogRef.close();
  }
  
  private _createForm() {
        this.addContactForm = this.fb.group({
            name: [
                this.data.name,
                [
                  Validators.required,
                ],
          ],
          number: [this.data.number, [Validators.required, Validators.minLength(1)]],
        });
  }


}

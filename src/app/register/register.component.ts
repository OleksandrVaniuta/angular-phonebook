import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registationError: boolean = false
 registerForm!: FormGroup;
  route = inject(Router)

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this._createForm();
    }
 
  private _createForm() {
    this.registerForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(2)]],
          email: [
                '',
                [
                  Validators.required,
                  Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                    
                ],
          ],
          password: ['', [Validators.required, Validators.minLength(7)]],
        });
  }

  handleNavToLogin() {
    this.route.navigateByUrl('/login')
  }

   submitRegistation() {
     this.authService.signup({ name: this.registerForm.value.name, email: this.registerForm.value.email, password: this.registerForm.value.password }).subscribe({
       next: res => {
          this.registationError = false
         this.route.navigateByUrl('/contacts')
       }
       , error: err => {
           this.registationError = true
       }
     })
  }
}



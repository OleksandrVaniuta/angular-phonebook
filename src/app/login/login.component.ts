import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError: boolean = false
  loginForm!: FormGroup;
  route = inject(Router)

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this._createForm();
    }
 
  private _createForm() {
        this.loginForm = this.fb.group({
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

  onSubmit() {
  }

  handleNavToRegister() {
     this.route.navigateByUrl('/register')
  }


  submitApplication() {
    console.log(this.loginForm.value.email)
    console.log(this.loginForm.value.password)
    this.authService.login({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe({ next: res => {
       this.loginError = false
      this.route.navigateByUrl('/contacts')
    }, error: err => {
      console.log(err)
      this.loginError = true
     }})
  }
}

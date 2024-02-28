import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'phonebook';
  userEmail: string | null = ''

  route = inject(Router)
  constructor(public isAuth: AuthService) { }
  

  logOut() {
    console.log( this.isAuth.isAuthenticated)
    this.isAuth.logout()
    this.route.navigateByUrl('/login')
  }

  refresh() {
    this.isAuth.refresh()
  }

  ngOnInit(): void {
    if (localStorage.getItem('authToken')!== null) {
      this.isAuth.isAuthenticated = true

       this.isAuth.refresh().subscribe({ next: res => {
       
    }, error: err => {
      if (err) {
        this.logOut()
      }
     }})
      
    }
     if (localStorage.getItem('user')!== null) {
      this.userEmail = localStorage.getItem('user')
    }
  }
}

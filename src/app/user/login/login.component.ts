import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  mouseoverLogin: boolean;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Username: johnpapa
  // Password: doesnt matter
  login (formValues) {
    this.authService.loginUser(formValues.userName, formValues.password)
    .subscribe(response => {
      if (!response) {
        this.loginInvalid = true;
      } else {
        this.loginInvalid = false;
        this.router.navigate(['events']);
      }
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  onLogin() {
    // debugger;
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.token) {
          alert('Login success');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          alert('Login failed');
        }
      },
      (error) => {
        alert('Login failed');
      }
    );
  }

  onSignup() {
    // debugger;
    this.authService.register(this.username, this.password).subscribe(
      (response: any) => {
        alert('Signup success');
        // this.router.navigate(['/login']);
      },
      (error) => {
        alert('Signup failed');
        console.error('Error during signup:', error);
      }
    );
  }
}

import { HEADERS_OPTIONS } from '../staticVars';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  signinUser(loginData: any) {
    this.http
      .post(
        'api/login?email=' +
          loginData.username +
          '&password=' +
          loginData.password +
          '&GMT_PLUS=0',
        {}
      )
      .subscribe(
        (data: any) => {
          if (data.Result === 1) {
            this.login(data.lastName + " " + data.firstName);
            this.router.navigate(['help_request']);
          } else {
            Swal.fire('Vérifier vos identifiants de connexion!', '', 'error');
          }
        },
        (err) => {
          Swal.fire(
            "une erreur s'est produite lors de l'authentification!",
            err.message,
            'error'
          );
        }
      );
  }

  getTimezoneOffset() {
    return String(new Date().getTimezoneOffset());
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(localStorage.getItem('jwtToken') !== null);
      }, 800);
    });
    return promise;
  }

  login(login: any) {
    localStorage.setItem('login', login);
  }

  closeChangePass() {
    this.snackBar.dismiss();
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }
}

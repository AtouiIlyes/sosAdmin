import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HEADERS_OPTIONS } from '../staticVars';

let user: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  observableUsers: BehaviorSubject<any[]>;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.observableUsers = new BehaviorSubject<any>(user);
  }

  getUsers() {
    const data = '{"type":0}';
    let body = new URLSearchParams();
    body.set('data', data);
    this.http
      .post('api/infra/users', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        observe: 'response',
      })
      .subscribe(
        (res) => {
          user = JSON.parse(JSON.stringify(res.body));
          this.eventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.router.navigate(['login']);
          }
        }
      );
  }

  eventChange() {
    this.observableUsers.next(user);
  }
}

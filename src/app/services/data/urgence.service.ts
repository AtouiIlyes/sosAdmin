import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HEADERS_OPTIONS } from '../staticVars';
let urgence: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UrgenceService {
  observableUrgence: BehaviorSubject<any[]>;

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.observableUrgence = new BehaviorSubject<any>(urgence);
  }

  getUrgences() {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded;charset=UTF-8'
      ),
    };
    const dataBody = '{"type":0}';
    body.set('data', dataBody);
    this.http.post('/api/urgence', body.toString(), options).subscribe(
      (res) => {
        urgence = JSON.parse(JSON.stringify(res));
        this.eventChange();
      },
      (err) => {
        if (err.status === 403) {
          this.auth.logout();
        }
      }
    );
  }
  getUrgencesHistory() {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded;charset=UTF-8'
      ),
    };
    const dataBody = '{"type":3}';
    body.set('data', dataBody);
    this.http.post('/api/urgence', body.toString(), options).subscribe(
      (res) => {
        urgence = JSON.parse(JSON.stringify(res));
        this.eventChange();
      },
      (err) => {
        if (err.status === 403) {
          this.auth.logout();
        }
      }
    );
  }

  sendHelp(id: any) {
    let body = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded;charset=UTF-8'
      ),
    };
    const dataBody = '{"type":2, "id":"' + id + '"}';
    body.set('data', dataBody);
    this.http.post('/api/urgence', body.toString(), options).subscribe(
      (res) => {
        urgence = JSON.parse(JSON.stringify(res));
        this.eventChange();
      },
      (err) => {
        if (err.status === 403) {
          this.auth.logout();
        }
      }
    );
  }

  eventChange() {
    this.observableUrgence.next(urgence);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HEADERS_OPTIONS } from '../staticVars';

let departments: any = undefined;

@Injectable({
  providedIn: 'root',
})
export class UrgenceDepartmentsService {
  observableUrgenceDepartments: BehaviorSubject<any[]>;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.observableUrgenceDepartments = new BehaviorSubject<any>(departments);
  }

  getUrgenceDepartments() {
    const data = '{"type":0}';
    let body = new URLSearchParams();
    body.set('data', data);
    this.http
      .post('api/infra/departments', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        observe: 'response',
      })
      .subscribe(
        (res) => {
          departments = JSON.parse(JSON.stringify(res.body));
          this.eventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.router.navigate(['login']);
          }
        }
      );
  }

  addDepartment(department: any) {
    const data =
      '{"type":1, "name":"' +
      department.name +
      '","lat":' +
      department.lat +
      ',"lon":' +
      department.lon +
      ',"role":"' +
      department.role +
      '"}';
    let body = new URLSearchParams();
    body.set('data', data);
    this.http
      .post('api/infra/departments', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        observe: 'response',
      })
      .subscribe(
        (res) => {
          department = JSON.parse(JSON.stringify(res.body));
          this.eventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.router.navigate(['login']);
          }
        }
      );
  }

  updateDepartment(department: any, id: number) {
    const data =
      '{"type":2, "id":' +
      id +
      ',"name":"' +
      department.name +
      '","lat":' +
      department.lat +
      ',"lon":' +
      department.lon +
      ',"role":"' +
      department.role +
      '"}';
    let body = new URLSearchParams();
    body.set('data', data);
    this.http
      .post('api/infra/departments', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        observe: 'response',
      })
      .subscribe(
        (res) => {
          department = JSON.parse(JSON.stringify(res.body));
          this.eventChange();
        },
        (err) => {
          if (err.status === 403) {
            this.router.navigate(['login']);
          }
        }
      );
  }

  deleteDepartment(id: number) {
    const data = '{"type":3, "id":' + id + '}';
    let body = new URLSearchParams();
    body.set('data', data);
    this.http
      .post('api/infra/departments', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        observe: 'response',
      })
      .subscribe(
        (res) => {
          departments = JSON.parse(JSON.stringify(res.body));
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
    this.observableUrgenceDepartments.next(departments);
  }
}

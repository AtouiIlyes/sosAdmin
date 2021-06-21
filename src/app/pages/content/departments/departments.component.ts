import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UrgenceDepartmentsService } from 'src/app/services/data/urgenceDepartments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  departments = [];
  departmentTypes = [
    { id: 'police', value: 'Police' },
    { id: 'fire_station', value: 'Pompiers' },
    { id: 'ambulence', value: 'Ambulance' },
    { id: 'samu', value: 'SAMU' },
  ];
  departmentSubscription: Subscription = new Subscription();

  constructor(private department: UrgenceDepartmentsService) {
    this.departmentSubscription =
      this.department.observableUrgenceDepartments.subscribe((items: any) => {
        this.departments = items;
      });
  }

  ngOnInit(): void {
    this.department.getUrgenceDepartments();
  }

  insertRow(event: any) {
    this.department.addDepartment(event.data);
  }

  updateRow(event: any) {
    this.department.updateDepartment(event.data, event.key);
  }

  removeRow(event: any) {
    this.department.deleteDepartment(event.key);
  }
}

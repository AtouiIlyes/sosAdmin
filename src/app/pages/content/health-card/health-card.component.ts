import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-health-card',
  templateUrl: './health-card.component.html',
  styleUrls: ['./health-card.component.scss'],
})
export class HealthCardComponent implements OnInit {
  items = ['oui', 'non'];
  bloodType = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  user: any;
  health: any;
  constructor(
    public dialogRef: MatDialogRef<HealthCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    if (this.data.health !== undefined) {
      this.health = this.data.health;
    } else {
      this.health = {
        anaphylaxis: 0,
        blood_group: '',
        diabetes: 0,
        doctor: '',
        epipen: 0,
        family_doctor: 0,
        id: 0,
        organ_donor: 0,
      };
    }
  }
}

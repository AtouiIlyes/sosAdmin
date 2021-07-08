import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-card',
  templateUrl: './health-card.component.html',
  styleUrls: ['./health-card.component.scss'],
})
export class HealthCardComponent implements OnInit {
  user: any = {
    id: 1594160,
    firstName: 'Hadj Abid',
    lastName: 'Oumaima',
    birthDate: new Date(1999, 5, 23),
    address: 'tt sue',
    city: 'El Jem',
    state: 'Tunisie',
    zipcode: '5160',
    phone: '+(216) 22457123',
    email: 'oumaima@email.com',
    skype: 'oumaima_skype',
  };
  items = ['oui', 'non'];
  bloodType = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/data/user.service';
import { HealthCardComponent } from '../health-card/health-card.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = [];
  userSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userSubscription = this.userService.observableUsers.subscribe(
      (items: any) => {
        this.users = items;
      }
    );
  }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  onCellButtonClick(data: any) {
    const dialogRef = this.dialog.open(HealthCardComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.5 + 'px',
      height: window.innerWidth < 720 ? '100%' : 'auto',
      data: data,
      maxWidth: 'none',
    });
  }



}

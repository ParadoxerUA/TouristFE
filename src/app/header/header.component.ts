import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginPopUpComponent } from '../login-pop-up/login-pop-up.component';
import { RegisterPopUpComponent } from '../register-pop-up/register-pop-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(public dialog: MatDialog) { }

  openSignInDialog(): void {
    let dialogRef = this.dialog.open(LoginPopUpComponent, {
      width: '600px',
      height: '350px',
      data: {email: this.email, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.email = result.email;
        this.password = result.password;
      }
    });
  }

  openSignUpDialog(): void {
    let dialogRef = this.dialog.open(RegisterPopUpComponent, {
      width: '600px',
      height: '500px',
      data: {firstname: this.firstname,
             lastname: this.lastname,
             email: this.email,
             password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.firstname = result.firstname;
        this.lastname = result.lastname;
        this.email = result.email;
        this.password = result.password;
      }
    });
  }

  ngOnInit() {
  }

}

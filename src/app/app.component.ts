import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginPopUpComponent } from './login-pop-up/login-pop-up.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'touristfe';
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

  ngOnInit() { }
}

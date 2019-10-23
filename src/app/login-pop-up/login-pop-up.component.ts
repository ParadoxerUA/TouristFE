import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
 email: string;
 password: string;
}

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.css']
})
export class LoginPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){ }

  ngOnInit() {
  }

}

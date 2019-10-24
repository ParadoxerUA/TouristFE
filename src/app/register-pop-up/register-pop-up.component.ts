import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

export interface DialogData {
 firstname: string;
 lastname: string;
 email: string;
 password: string;
}

@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.css']
})
export class RegisterPopUpComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){ }

  ngOnInit() {
  }

}

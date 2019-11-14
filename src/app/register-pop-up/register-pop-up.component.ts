import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import {UserService} from '../_services/user.service'

export interface DialogData {
 name: string;
 surname: string;
 email: string;
 password: string;
}

@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.css']
})
export class RegisterPopUpComponent implements OnInit {

  email = new FormControl('1', [Validators.required, Validators.email]);
  password = new FormControl('2', [Validators.required, Validators.minLength(8),
    Validators.pattern(RegExp('(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\\d]'))]);
  name = new FormControl('3', [Validators.required, Validators.minLength(2),
    Validators.maxLength(30)])
  surname = new FormControl('4', [Validators.minLength(2),
      Validators.maxLength(30)])
  submitted = false;
  passwordHide = true

  sendCredentials() {
    this.userService.postCredentials(this.data)
      .subscribe((response) => {
        console.log(response)
        this.submitted = true
      })
  }

  dataInvalid(): boolean{
    return (this.email.invalid || this.password.invalid
      || this.name.invalid || this.surname.invalid);
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    ){ }

  ngOnInit() {
  }

}

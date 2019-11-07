import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service'
import { Router } from '@angular/router';

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

  email = new FormControl('', [Validators.required, Validators.email]);
  passwordHide = true;
  sessionId: string

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  loginUser() {
    this.userService.userLogin(this.data)
      .subscribe(res => {
        this.userService.setSessionId(res.body.data)
        console.log(this.userService.getSessionId())
        this.router.navigate(['trip-list'])
      })
    
  }

  constructor(
    public dialogRef: MatDialogRef<LoginPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private router: Router,
  ){ }

  ngOnInit() {
  }

}

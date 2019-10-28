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

  email = new FormControl('', [Validators.required, Validators.email]);
  submitted = false;
  passwordHide = true

  sendCredentials() {
    this.userService.postCredentials(this.data)
      .subscribe((response, err) => {
        if(err === undefined) {
          console.log(response)
          this.submitted = true
        } 
      })
    
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

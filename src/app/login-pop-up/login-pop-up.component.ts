import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service'
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';


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
  user: SocialUser;
  loggedIn: boolean;

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
      })
  }

  logInSocial(type: string): void {
    let provider;
    if(type == "facebook"){
      provider = FacebookLoginProvider.PROVIDER_ID
    } else if(type == "google"){
      provider = GoogleLoginProvider.PROVIDER_ID
    }
    this.authService.signIn(provider)
  }
  
  logOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
  }

  constructor(
    public dialogRef: MatDialogRef<LoginPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService, 
    private authService: AuthService,
  ){ 
    this.loggedIn = false;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn === true){
        let data = {'auth_token': this.user.authToken, 'provider': this.user.provider}
        this.userService.userSocialLogin(data).subscribe(res => console.log(res))

      }
    }
    );
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { UserService } from '../_services/user.service'
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';


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

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  logInUser(type?: string) {
    // Pass if user already authorized
    if(this.userService.userIsAuthorized()){
      return;
    }
    // if type was not passed into a function
    if(type === undefined){
      return this.userService.userLogin(this.data)
      .subscribe(res => {
        this.userService.setSessionId(res.body.data);
      })
    // if type was passed
    } else if(type == "facebook"){
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else if(type == "google"){
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    // subscribe on social authentication state (returns observable user)
    this.authService.authState.subscribe((user) => {
      // check if authentication is successful (returns user) and user is not authorized
      if (user && !this.userService.userIsAuthorized()){
        this.userService.userSocialLogin(this.getSocialData(user)).subscribe(res => {
          this.userService.setSessionId(res.body.data);
        })
      }
    });

    this.logOutSocial();
  }

  private getSocialData(user){
    return {'auth_token': user.authToken, 'provider': user.provider}
  }
  
  logOutSocial(): void {
    this.authService.signOut();
  }

  constructor(
    public dialogRef: MatDialogRef<LoginPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService, 
    private authService: AuthService,
  ){ }

  ngOnInit() { }

}

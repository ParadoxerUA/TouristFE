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
    if(this.userService.userIsAuthorized()){
      return;
    }
    
    if(type == "facebook"){
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else if(type == "google"){
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else {
      this.userService.userLogin(this.data)
      .subscribe(res => {
        this.userService.setSessionId(res.body.data);
      })
    }
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

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user && !this.userService.userIsAuthorized()){
        let data = {'auth_token': user.authToken, 'provider': user.provider};
        this.userService.userSocialLogin(data).subscribe(res => {
          this.userService.setSessionId(res.body.data);
        })
      }
    });
  }

}

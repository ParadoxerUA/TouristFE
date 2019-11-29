import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from '../user';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class UserProfileComponent implements OnInit {
  calculateFormOpened = false;
  passwordFormOpened = false;
  result: number;
  gender: string;

  userGender = new FormControl('', Validators.required);
  userHeight = this.getUserFormControl();
  userWeight = this.getUserFormControl();
  oldPassword = this.getPasswordFormControl();
  newPassword = this.getPasswordFormControl();
  confirmPassword = this.getPasswordFormControl();
  passswordGroup = new FormGroup({first: this.newPassword, 
    second: this.confirmPassword}, this.passwordMatchValidator);

  @ViewChild('sidenav', {static: true}) public userSideNav: MatSidenav;
  public user;

  private getUserFormControl(){
    return new FormControl('', [Validators.required, 
      Validators.pattern("^(?:[1-9][0-9]{2}|[1-9][0-9]|[1-9])$")]);
  }

  private getPasswordFormControl(){
    return new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern(RegExp('(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\\d]'))]);
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('first').value === g.get('second').value
       ? null : {'mismatch': true};
 }

  changeCapacity(): void {
    let delta = this.gender === "male" ? 4 : 0;

    this.result = ((this.userWeight.value * 0.3) + ((this.userHeight.value-100)/5) + delta) / 2;

    this.userService.updateCapacity(this.result)
    .subscribe(() => this.userService.refreshUser());
    this.calculateFormOpened = false;
  }

  updatePassword(){
    let data = {};
    if(this.oldPassword.value !== null){
      data = {'old_password': this.oldPassword.value};
      console.log("FUCK")
    }
    data['new_password'] = this.newPassword.value
    this.userService.updatePassword(data)
    .subscribe(() => {
      this.userService.refreshUser();
      alert('Password was changed');
    });
    this.clearPasswordForm();
  }

  private clearPasswordForm(){
    this.passwordFormOpened = false;
    this.resetPasswordFields();
  }

  private resetPasswordFields(){
    this.oldPassword.reset();
    this.newPassword.reset();
    this.confirmPassword.reset();
  }

  private resetCapacityFields(){
    this.userGender.reset();
    this.userHeight.reset();
    this.userWeight.reset();
  }

  toggleCalculateForm(){
    this.calculateFormOpened = !this.calculateFormOpened;
    this.resetCapacityFields();
  }

  togglePasswordForm(){
    this.passwordFormOpened = !this.passwordFormOpened;
    this.resetPasswordFields();
  }

  getHeightErrorMessage() {
    return this.userHeight.hasError('required') ? 'Enter a number' :
        this.userHeight.hasError('pattern') ? 'Number from 1 to 999' :
            '';
  }

  getWeightErrorMessage() {
    return this.userWeight.hasError('required') ? 'Enter a number' :
        this.userWeight.hasError('pattern') ? 'Number from 1 to 999' :
            '';
  }

  getPasswordErrorMessage(password){
    return password.hasError('required') ? 'You must enter a value' :
        password.hasError('minlength') ? 'Min length is 8 characters':
        password.hasError('pattern') ? 'At least 1 digit and 1 character':
        password.hasError()
            '';
  }

  getPasswordGroupErrorMessage(password){
    return this.passswordGroup.hasError('mismatch') ? 'Passwords do not match.': 
        this.getPasswordErrorMessage(password);
  }

  capacityDataInvalid(): boolean{
    return (this.userHeight.invalid
      || this.userWeight.invalid
      || this.userGender.invalid);
  }

  passwordDataInvalid(): boolean{
    return (this.newPassword.invalid
      || this.confirmPassword.invalid || this.passswordGroup.invalid);
  }

  navigateToTripList(): void
  {
    this.router.navigate(['trip-list']);
    this.userSideNav.close();
  }

  logoutUser(): void {
    this.authService.userLogout()
      .subscribe(res => {
        this.authService.deleteSessionId();
        window.location.reload();
      });
  }

  private clearUser(){
    this.user = new User('','', 0, '', '');
  }

  constructor(
      private userService: UserService,
      private router: Router,
      private authService: AuthService,
  ){ }

  ngOnInit() {
    this.clearUser();
    this.userService.refreshUser();
    this.userService.setUserSideNav(this.userSideNav);
    this.userService.getEmittedValue()
        .subscribe(item => this.user=item);
  }

}

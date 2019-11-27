import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { User} from '../user';
import { FormControl, Validators } from '@angular/forms';
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
  displayCalculateForm = false;
  result: number;
  gender: string;
  editable: boolean;
  userDataIsIncorrect: boolean;

  surnameFormControl = new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]);
  nameFormControl = new FormControl('', [Validators.minLength(2), Validators.maxLength(30), Validators.required]);
  capacityControl = new FormControl('', [Validators.min(1), Validators.max(40), Validators.required]);
  userGender = new FormControl('', Validators.required);
  userHeight = new FormControl('', [Validators.required, Validators.pattern("^(?:[1-9][0-9]{2}|[1-9][0-9]|[1-9])$")]);
  userWeight = new FormControl('', [Validators.required, Validators.pattern("^(?:[1-9][0-9]{2}|[1-9][0-9]|[1-9])$")]);

  @ViewChild('sidenav', {static: true}) public userSideNav: MatSidenav;
  public user: User;

  changeCapacity(height: number, weight: number): void {
    if (this.gender === "male") {
      this.result = ((weight * 0.3) + ((height-100)/5) + 4) / 2;
    }
    if (this.gender === "female") {
      this.result = ((weight * 0.3) + ((height-100)/5)) / 2;
      console.log(this.result)
    }
    // this.user.capacity = this.result;
    // this.submitUserData();
    this.userService.updateCapacity(this.result)
    .subscribe(() => this.userService.refreshUser());
    this.displayCalculateForm = false;
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  letterOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    // console.log('charCode ', charCode);
    if ((charCode != 32) && (charCode != 39) && (charCode < 65 || charCode > 122 )) {
      return false;
    }
    return true;
}

  dataInvalid(): boolean{
    return (this.userHeight.invalid
      || this.userWeight.invalid
      || this.userGender.invalid);
  }

  logoutUser(): void {
    this.authService.userLogout()
      .subscribe(res => {
        this.authService.deleteSessionId();
      });
    this.userSideNav.close();
    this.clearUser();
    this.router.navigate(['/index']);
  }

  private clearUser(){
    this.user = new User('','', 0, '', '');
  }
  submitUserData()
  {
    this.editable=false;
    if(!this.user.surname){this.user.surname=''}
    this.userService.updateUser(this.user.name, this.user.surname, this.user.capacity)
        .subscribe(() => this.userService.refreshUser());

  }

  checkUserData()
  {
    let nameIsIncorect = this.nameFormControl.hasError('minlength')||
        this.nameFormControl.hasError('maxlength')||
        this.nameFormControl.hasError('required');
    let surnameIsCorrect = this.surnameFormControl.hasError('minlength')||
        this.surnameFormControl.hasError('maxlength');
    let capasityIsCorrect = this.capacityControl.hasError('min')||this.capacityControl.hasError('max')||this.capacityControl.hasError('required');
    this.userDataIsIncorrect = nameIsIncorect||surnameIsCorrect||capasityIsCorrect;
  }

  constructor(
      private userService: UserService,
      private router: Router,
      private authService: AuthService,
  ){ }

  ngOnInit() {
    this.clearUser();
    this.userService.refreshUser();
    this.editable = false;
    this.userService.setUserSideNav(this.userSideNav);
    this.userService.getEmittedValue()
        .subscribe(item => this.user=item);
  }

}

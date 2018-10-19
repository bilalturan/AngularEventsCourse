import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { TOASTR_TOKEN, IToastr } from '../../common/toastr.service';
import * as fromUser from '../state/user.reducer';
import { select, Store } from '@ngrx/store';
import * as userActions from '../state/user.actions';
import { User } from '../user.model';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private componentActive = true;

  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;
  username: string;

  constructor(private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: IToastr,
    private store: Store<fromUser.State>) { }

  ngOnInit() {
    this.firstName = new FormControl
    (this.authService.currentUser.firstName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl
    (this.authService.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });

    this.store.pipe(
      select(fromUser.getUsername),
      takeWhile(() => this.componentActive)
    )
    .subscribe(user => {
      console.log('User subscription called');
      this.username = user.firstName + ' ' + user.lastName;
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  cancel() {
    this.router.navigate(['events']);
  }

  saveProfile(formValues): void {

    if (this.profileForm.valid) {
      this.store.dispatch(new userActions.UpdateUsername(formValues));
      this.toastr.success('Profile updated');
    }
  }

  logout() {
    this.authService.logout()
    .subscribe(() => {
      this.router.navigate(['/user/login']);
     });

     this.store.dispatch({
      type: 'UPDATE_USERNAME',
      payload: undefined
    });
  }

  validateFirstName(): boolean {
    return this.firstName.valid
        || this.firstName.untouched;
  }

  validateLastName(): boolean {
    return this.lastName.valid
        || this.lastName.untouched;
  }
}

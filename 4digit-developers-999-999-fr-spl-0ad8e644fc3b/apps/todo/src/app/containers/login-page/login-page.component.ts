import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthState, AuthActions, AuthStateSelectors } from '@fr-spl/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  pending = this.store.select(AuthStateSelectors.getPending);
  error = this.store.select(AuthStateSelectors.getError);

  constructor(private store: Store<AuthState>) {}

  ngAfterViewInit() {
    this.pending.subscribe(isPending => {
      if (isPending) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(new AuthActions.Login(this.form.value));
    }
  }
}

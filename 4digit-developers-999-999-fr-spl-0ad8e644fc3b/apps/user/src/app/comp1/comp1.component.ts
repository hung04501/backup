import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@user/app/+state/app.interfaces';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class Comp1Component implements OnInit {
  options = [{ id: 1, label: 'Category One' }, { id: 2, label: 'Category Two' }];
  newStory: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.newStory = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      draft: new FormControl(false),
      category: new FormControl(this.options[1].id, Validators.required)
    });
  }

  submit($event) {}
}

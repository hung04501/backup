import {
  Component,
  OnInit,
  NgModule,
  ViewEncapsulation,
  ModuleWithProviders,
} from '@angular/core';

@Component({
  selector: 'a-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // NOTE: use host property only for adding class
  // tslint:disable-next-line
  host: {
    'class': 'a-icon'
  }
})
export class IconComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}

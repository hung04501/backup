import { Directive, EventEmitter, Input, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroupDirective, FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { CacheService } from '../caching/cache.service';

@Directive({
  selector: '[appFormCacheKey]'
})
export class FormCacheDirective implements OnInit, OnDestroy {
  @Input() appFormCacheKey: string;
  @Input() debounce = 300;
  formChange: Subscription;

  constructor(private formGroupDirective: FormGroupDirective, private cachedService: CacheService) {}

  @HostListener('submit')
  onSubmit() {
    if (this.formGroupDirective.form.valid) {
      this.cachedService.remove(this.appFormCacheKey);
    }
  }

  ngOnInit() {
    if (this.cachedService.has(this.appFormCacheKey)) {
      this.cachedService
        .get(this.appFormCacheKey)
        .take(1)
        .subscribe(value => {
          this.formGroupDirective.form.patchValue(value);
        });
    }

    this.formChange = this.formGroupDirective.form.valueChanges.debounceTime(this.debounce).subscribe(value => {
      this.cachedService.set(this.appFormCacheKey, value);
    });
  }

  ngOnDestroy() {
    this.formChange.unsubscribe();
  }
}

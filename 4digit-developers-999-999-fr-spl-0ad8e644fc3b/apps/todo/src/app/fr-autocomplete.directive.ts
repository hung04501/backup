import { DOCUMENT } from '@angular/platform-browser';
import { Directive, ElementRef, Renderer2, AfterViewInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SuggestionService } from './suggestion.service';

// https://github.com/Pixabay/JavaScript-autoComplete/blob/master/auto-complete.js
@Directive({
  selector: 'input[appFrAutocomplete]'
})
export class FrAutocompleteDirective implements AfterViewInit {
  overlay: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private suggestSvr: SuggestionService,
    @Inject(DOCUMENT) private document
  ) {
    // console.log(this.el.nativeElement, this.document.body);
    this.overlay = this.renderer.createElement('div');
    this.renderer.addClass(this.overlay, 'autocomplete-suggestions');
    this.renderer.setStyle(this.overlay, 'display', 'none');
    this.renderer.appendChild(this.document.body, this.overlay);
  }

  ngAfterViewInit() {
    this.updateSC(false, null);
    Observable.fromEvent(window, 'resize').subscribe(_ => this.updateSC(true, null));

    const typingStream = Observable.fromEvent(this.el.nativeElement, 'keyup')
      .merge(Observable.fromEvent(this.el.nativeElement, 'blur'))
      .merge(Observable.fromEvent(this.el.nativeElement, 'focus'))
      .map((e: KeyboardEvent | FocusEvent) => {
        if (e instanceof KeyboardEvent) {
          return e.code === 'Enter' ? '' : this.el.nativeElement.value;
        }
        return e.type === 'blur' ? '' : this.el.nativeElement.value;
      });

    this.suggestSvr
      .getSuggestFor(typingStream)
      // .do(ss => console.log(ss.join(', ')))
      .map(ss =>
        ss.map(s => {
          const overlaySuggestion = this.renderer.createElement('div');
          this.renderer.addClass(overlaySuggestion, 'autocomplete-suggestion');
          overlaySuggestion.innerText = s;
          return overlaySuggestion;
        })
      )
      .subscribe(overlaySuggestions => {
        if (overlaySuggestions.length) {
          this.overlay.innerHTML = '';
          overlaySuggestions.forEach(s => this.renderer.appendChild(this.overlay, s));
          this.renderer.setStyle(this.overlay, 'display', 'block');
        } else {
          this.renderer.setStyle(this.overlay, 'display', 'none');
        }
      });
  }

  updateSC(resize, next) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    // console.log(rect.left, (window.pageXOffset || this.document.scrollLeft));
    this.renderer.setStyle(this.overlay, 'left', `${rect.left}px`);
    this.renderer.setStyle(this.overlay, 'top', `${rect.bottom}px`);
    this.renderer.setStyle(this.overlay, 'width', Math.round(rect.right - rect.left) + 'px');
  }
}

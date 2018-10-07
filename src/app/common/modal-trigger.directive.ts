import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import {JQ_TOKEN } from './jquery.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('modal-trigger') modalId: string;

  private el: HTMLElement;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', (event)  => {
      const selector = `#${this.modalId}`;

      console.log('selector: ' + selector);

      this.$(selector).modal({});
    });
  }


}

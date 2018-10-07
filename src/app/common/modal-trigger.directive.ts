import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import {JQ_TOKEN } from './jquery.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {

  private el: HTMLElement;
  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', (event)  => {
      this.$('#simple-modal').modal({});
    });
  }


}

import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQ_TOKEN } from '../jquery.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent implements OnInit {

  @Input() title: string;
  @Input() elementId: string;
  @ViewChild('modalContainer') containerEl: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) { }

  ngOnInit() {
  }

  closeModal() {
    this.$(this.containerEl.nativeElement).modal('hide');
  }
}

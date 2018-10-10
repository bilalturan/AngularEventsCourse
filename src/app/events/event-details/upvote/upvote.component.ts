import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {

  @Input() count: number;
  @Input() set voted(val) {
    this.iconColor = val ? 'red' : 'white';
  }
  @Output() vote = new EventEmitter();
  iconColor: string;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.vote.emit({});
  }

}

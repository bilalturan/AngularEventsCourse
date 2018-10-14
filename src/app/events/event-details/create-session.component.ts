import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Session } from '../models/event';
import { restictedWords } from '../../shared/restricted-words.validator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {

  @Output() sessionCreated = new EventEmitter<Session>();
  @Output() sessionCreationCancelled = new EventEmitter();

  newSessionForm: FormGroup;

  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  constructor() { }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required,
      Validators.maxLength(400), restictedWords(['foo', 'bar'])]);
    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  saveSession(formValues) {
     const session = {
        id: undefined,
        name: formValues.name,
        presenter: formValues.presenter,
        duration: +formValues.duration,
        level: formValues.level,
        abstract: formValues.abstract,
        voters: []
     };

     this.sessionCreated.emit(session);
  }

  cancel() {
    this.sessionCreationCancelled.emit();
  }
}

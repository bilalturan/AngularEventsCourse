import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/event.service';
import { Event } from '../models/event';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../state/app.reducer';
import { State } from '../../state/app.state';
import * as appActions from '../../state/app.actions';
import { takeWhile } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


// Custom validator without params
function ratingRange(c: AbstractControl): {[key: string]: boolean}  | null {
  if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return {'range': true};
  }
  return null;
}

// Validator functions with params (factory)
function ratingRangeWithParams(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean}  | null => {
    if (c.value !== undefined && (isNaN(c.value)
      || c.value < min
      || c.value > max)) {
      return {'range': true};
    }
    return null;
  }
}



@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  eventForm: FormGroup;


  private componentActive = true;

  showOnlineUrl: boolean;

  newEvent: Event;
  isDirt = true;
  constructor(private router: Router, private eventService: EventService,
    private store: Store<State>, private fb: FormBuilder) { }

  ngOnInit() {

    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', [
        Validators.required,
        Validators.pattern('.*\/.*.(png|jpg)')
       ]
      ],
      location: this.fb.group({
         address: '',
         city: '',
         country: '',
      }),
      onlineUrl: ['', Validators.required],
      rating: ['',  [Validators.required, ratingRangeWithParams(4, 12)] ]
    });

    this.store.pipe(
      select(fromRoot.getShowOnlineUrl),
      takeWhile(() => this.componentActive)
    )
    .subscribe(showOnlineUrl => {
      this.showOnlineUrl = showOnlineUrl;
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  saveEvent() {
    const formValue = this.eventForm.value;
    this.eventService.saveEvent(formValue).subscribe( () => {
      this.isDirt = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  toggleShowOnlineUrl(value: boolean) {
    const payload: boolean = !value;
    this.store.dispatch(new appActions.ToggleShowOnlineUrl(payload));
  }

  // Custom validator

  // Dynamically changing validation rules
  // setNotification(notifyVia: string): void {
  //   const priceControl = this.eventForm.controls.price;
  //   const timeControl = this.eventForm.controls.time;
  //   if (notifyVia === 'price') {
  //     priceControl.clearValidators();
  //     timeControl.setValidators(Validators.required);
  //   } else if (notifyVia === 'time') {
  //     timeControl.clearValidators();
  //     priceControl.setValidators(Validators.required);
  //   }
  //   priceControl.updateValueAndValidity();
  //   timeControl.updateValueAndValidity();
  // }

  populateTestData(): void {
    this.eventForm.patchValue({
      name: 'Bilal',
      date: '1-1-2008',
      time: '10 AM',
      price: 1000,
      imageUrl: '/image.png',
      // location: {
      //   address: new FormControl(),
      //   city: new FormControl(),
      //   country: new FormControl(),
      // }),
      onlineUrl: '/image.png'
    });
  }
}

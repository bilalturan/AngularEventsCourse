import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/event.service';
import { Event } from '../models/event';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../state/app.reducer';
import { State } from '../../state/app.state';
import * as appActions from '../../state/app.actions';
import { takeWhile, debounceTime } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from '@angular/forms';

// Custom validator without params
function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}

// Validator functions with params (factory)
function ratingRangeWithParams(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== undefined &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

// Validatig cross field (applied to formGroup)
function cityCountryMatcher( c: AbstractControl): { [key: string]: boolean } | null {
  const city = c.get('city');
  const country = c.get('country');

  if (city.pristine || country.pristine) {
    return null;
  }

  if (city.value != country.value) {
    console.log('City and country differs');
    return { match: true };
  }
  return null;
}

@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {
  eventForm: FormGroup;

  nameMessage: string;
  private nameValidationMessages = {
    required: 'Please enter your name', // get from extrenal source
    minlength: 'Min 3 characters'
  };

  private componentActive = true;

  showOnlineUrl: boolean;

  newEvent: Event;
  isDirt = true;
  constructor(
    private router: Router,
    private eventService: EventService,
    private store: Store<State>,
    private fb: FormBuilder
  ) {}

  buildLocation(): FormGroup {
    return this.fb.group({
      address: '',
      city: ['', Validators.required],
      country: ['', Validators.required]
    },
      { validator: cityCountryMatcher }
    );
  }

  get locations(): FormArray {
    return <FormArray>this.eventForm.get('locations');
  }
  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)] ],
      date: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: [
        '',
        [Validators.required, Validators.pattern('.*/.*.(png|jpg)')]
      ],
      locations: this.fb.array([
        this.buildLocation()
      ]),
      onlineUrl: ['', Validators.required],
      rating: ['', [Validators.required, ratingRangeWithParams(4, 12)]]
    });

    const nameCtrl = this.eventForm.get('name');
    nameCtrl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      this.setNameMessage(nameCtrl);
    });

    this.store
      .pipe(
        select(fromRoot.getShowOnlineUrl),
        takeWhile(() => this.componentActive)
      )
      .subscribe(showOnlineUrl => {
        this.showOnlineUrl = showOnlineUrl;
      });
  }

  setNameMessage(c: AbstractControl): void {
    this.nameMessage = '';
    if (c.invalid && c.touched) {
      this.nameMessage = Object.keys(c.errors)
        .map(key => {
          console.log(key);
          return this.nameValidationMessages[key];
        })
        .join(' ');
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  saveEvent() {
    const formValue = this.eventForm.value;
    this.eventService.saveEvent(formValue).subscribe(() => {
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

  addLocation() {
    console.log('addLocation');
    this.locations.push(this.buildLocation());
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

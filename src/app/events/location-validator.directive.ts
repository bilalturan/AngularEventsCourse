import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validateLocation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LocationValidatorDirective,
    multi: true
  }]
})
export class LocationValidatorDirective implements Validator {

  constructor() { }

  validate(contformGroup: FormGroup): { [key: string]: any } {

      const addressControl = contformGroup.controls['address'];
      const cityControl = contformGroup.controls['city'];
      const countryControl = contformGroup.controls['country'];
      const onlineUrlControl = (<FormGroup>contformGroup.root).controls['onlineUrl'];

      if ((addressControl && addressControl.value
        && cityControl && cityControl.value
        && countryControl && countryControl.value)
        || (onlineUrlControl && onlineUrlControl.value)) {
          return null;
        } else {
          return { validateLocation: false};
        }
      }
}

import { InjectionToken } from '@angular/core';

// create a token to be used as a key in Angulars dependency injector.
export let JQ_TOKEN = new InjectionToken<Object>('jQuery');

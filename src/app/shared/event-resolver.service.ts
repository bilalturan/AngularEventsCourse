import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from './event.service';
import { Observable } from 'rxjs';

import {Event} from '../events/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<Event> {

  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Event> {
    // IMPORTANT NOTE: resolver will automatically subsribes to
    // the observable. Other places we would have to call .subscribe().
    return this.eventService.getEvent(route.params['id']);
  }

}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventsListResolverService implements Resolve<any> {

  constructor(private eventService: EventService) { }

  resolve() {
    // IMPORTANT NOTE: resolver will automatically subsribes to
    // the observable. Other places we would have to call .subscribe().
    return this.eventService.getEvents();
  }

}

import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateEventComponent } from './create-event.component';

@Injectable({
  providedIn: 'root'
})
export class EventRouteDeactivatorGuard implements CanDeactivate<CreateEventComponent> {

  canDeactivate(component: CreateEventComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

      if (component.isDirt) {
        return window.confirm('Component dirty. You really want to cancel ?');
      }

      return true;
    }
}


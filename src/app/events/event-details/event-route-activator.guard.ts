import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../../shared/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventRouteActivatorGuard implements CanActivate {

  constructor(private eventService: EventService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
              : Observable<boolean> | Promise<boolean> | boolean {
      const id: number = +next.params['id'];

      console.log('In router activator - ID: ' + id);

      const itemExists = !!this.eventService.GetEvent(id);

      if (!itemExists) {
        this.router.navigate(['/404']);
      }

      return itemExists;
  }
}

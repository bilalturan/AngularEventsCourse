import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { E404Component } from './errors/e404.component';
import { EventsListResolverService } from './shared/events-list-resolver.service';
import {
  EventsListComponent,
  CreateEventComponent,
  EventDetailsComponent,
  // EventRouteActivatorGuard,
  EventRouteDeactivatorGuard
} from './events/index';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventResolverService } from './shared/event-resolver.service';

export const appRoutes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: [EventRouteDeactivatorGuard]
  },
  {
    path: 'events',
    component: EventsListComponent
   // resolve: {'events': EventsListResolverService }
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    resolve: {'event': EventResolverService }
    // canActivate: [EventRouteActivatorGuard]
  },
  {
    path: 'events/session/new',
    component: CreateSessionComponent },
  {
    path: '404',
    component: E404Component },
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      // Preload in background
      // { preloadingStrategy: PreloadAllModules }// preload instead of load by demand
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

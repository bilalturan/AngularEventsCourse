import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

import {TOASTR_TOKEN, IToastr} from './common/toastr.service';
import {JQ_TOKEN} from './common/jquery.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { E404Component } from './errors/e404.component';

import {
  EventsListComponent,
  EventThumbnailComponent,
  CreateEventComponent,
  EventDetailsComponent
} from './events/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well/collapsible-well.component';
import { DurationPipe } from './shared/duration.pipe';

const toastr: IToastr = window['toastr']; // to satisfy typescript compiler
const jQuery = window['$'];

@NgModule({
  // Component, pipes and directives to be used by this module
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    E404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe
  ],
  // Imported modules' exported declarations and providers
  // are available to this module.
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  // Services are added as providers
  providers: [
    {
      provide: TOASTR_TOKEN, // using injection token for global objects
      useValue: toastr
    },
    {
      provide: JQ_TOKEN, // using injection token for global objects
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



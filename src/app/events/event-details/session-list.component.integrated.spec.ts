import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {SessionListComponent } from './session-list.component';
import {AuthService} from '../../user/auth.service';
import { VoterService } from './voter-service.service';
import { UpvoteComponent } from './upvote/upvote.component';
import { DurationPipe } from 'src/app/shared/duration.pipe';
import { CollapsibleWellComponent } from 'src/app/common/collapsible-well/collapsible-well.component';

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async() => {
    const authServiceMock = {
      isAuthenticated: () => true,
      currentUser: { userName: 'Clay' }
    };
    const voterServiceMock = {
      userHasVoted: () => false
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        // UpvoteComponent,  // FOR SHALLOW TEST
        // CollapsibleWellComponent,  // FOR SHALLOW TEST
        DurationPipe
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock},
        { provide: VoterService, useValue: voterServiceMock},
      ],
      schemas: [
        NO_ERRORS_SCHEMA  // FOR SHALLOW TEST
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('Initials display', () => {
    it('should have the correct session title', () => {
      component.sessions = [
        {
          id: 3,
          name: 'Session 1',
          presenter: 'Joe',
          duration: 1,
          level: 'beginner',
        abstract: 'abstract',
        voters: ['john', 'bob']
        }
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      // expect(element.querySelector('[well-title]').textContent)
      // .toContain('Session 1');

      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent)
      .toContain('Session 1');
    });

  });

});

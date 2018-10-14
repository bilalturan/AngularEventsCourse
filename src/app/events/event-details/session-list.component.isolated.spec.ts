import { SessionListComponent } from './session-list.component';
import { Session } from '../models/event';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter-service.service';


describe('SessionListComponent', () => {

  let component: SessionListComponent;
  const authServiceMock: AuthService = null;
  const voterServiceMock: VoterService = null;

  beforeEach(() => {
    // authServiceMock = jasmine.createSpyObj('httpMock', ['delete', 'post']);
    // voterServiceMock = jasmine.createSpyObj('httpMock', ['delete', 'post']);

    component = new SessionListComponent(authServiceMock, voterServiceMock);
  });

  describe('ngOnChanges', () => {
    it('should filter the sessions correctly', () => {

      // Arrange
      component.sessions = [
        <Session>{name: 'session 1', level: 'intermediate'},
        <Session>{name: 'session 2', level: 'intermediate'},
        <Session>{name: 'session 3', level: 'beginner'}
      ];

      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3; // Not used

      // Act
      component.ngOnChanges();

      // Assert
      expect(component.filteredSessions.length).toBe(2);
    });

    it('should sort the sessions correctly', () => {

      // Arrange
      component.sessions = [
        <Session>{name: 'session 3', level: 'beginner'},
        <Session>{name: 'session 2', level: 'intermediate'},
        <Session>{name: 'session 1', level: 'intermediate'}
      ];

      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3; // Not used

      // Act
      component.ngOnChanges();

      // Assert
      expect(component.filteredSessions[2].name).toBe('session 3');
    });
  });

});

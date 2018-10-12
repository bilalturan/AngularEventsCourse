import {VoterService} from './voter-service.service';
import {Session} from '../models/event';
import { of } from 'rxjs';


describe('VoterService', () => {

  let voterService: VoterService;
  let httpMock;

  beforeEach(() => {
     // The mock will have a delete and post method
    httpMock = jasmine.createSpyObj('httpMock', ['delete', 'post']);
    voterService = new VoterService(httpMock);
  });

  describe('deleteVoter', () => {

    it('should remove voter from list', () => {
      // Arrange
      const session = { id: 6, voters: ['Joe', 'John'] };
      // Setup mock to return observable of false for delete method
      httpMock.delete.and.returnValue(of(false));

      // Act
      voterService.deleteVoter(3, <Session>session, 'Joe');

      // Assert
      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('John');
    });

    it('should call server with the right URL', () => {
       // Arrange
       const session = { id: 6, voters: ['Joe', 'John'] };
       // Setup mock to return observable of false for delete method
       httpMock.delete.and.returnValue(of(false));

       // Act
       voterService.deleteVoter(3, <Session>session, 'Joe');

       // Assert
       expect(httpMock.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe');
    });

  });


  describe('addVoter', () => {

    it('should call server with the right URL', () => {
      // Arrange
      const session = { id: 6, voters: ['John'] };
      // Setup mock to return observable of false for delete method
      httpMock.post.and.returnValue(of(false));

      // Act
      voterService.addVoter(3, <Session>session, 'Joe');

       // Assert
       expect(httpMock.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe',
                            {}, jasmine.any(Object));
    });

  });

});

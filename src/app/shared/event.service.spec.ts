import {TestBed} from '@angular/core/testing';
import { EventService, Error } from './event.service';
import {Event} from '../events/models/event';
import {HttpTestingController, HttpClientTestingModule, TestRequest} from '@angular/common/http/testing';


describe('EventService Tests', () => {

    let eventService: EventService;
    let httpTestingController: HttpTestingController;

    const testEvents: Event[] = [
        <Event>{id: 1, name: 'First event', price: 123},
        <Event>{id: 2, name: 'Second event', price: 456},
        <Event>{id: 3, name: 'Third event', price: 789},
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EventService]
        });

        eventService = TestBed.get(EventService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should get all events', () => {
        eventService.getEvents().subscribe( (data: Event[]) => {
            expect(data.length).toBe(3);
        });

        const requestMock: TestRequest = httpTestingController.expectOne('/api/events');
        expect(requestMock.request.method).toEqual('GET');

        requestMock.flush(testEvents);
    });

    it('should return a custom Error object', () => {
        eventService.getEvents().subscribe(
            (data: Event[]) => fail('this should have been an error'),
            (err: Error) => {
                expect(err.msg).toContain('Error occured inside service');
            }
        );

        const requestMock: TestRequest = httpTestingController.expectOne('/api/events');
        expect(requestMock.request.method).toEqual('GET');

        requestMock.flush('error', {
            status: 500,
            statusText: 'server Error'
        });
    });

});

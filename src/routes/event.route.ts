import { Router } from 'express';
import EventController from '../controllers/events.controller';
import { CreateEventDto } from '../dtos/events.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class EventRoute implements Route {
    public path = '/events';
    public router = Router();
    public eventController = new EventController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.eventController.getEvents);
        this.router.get(`${this.path}/:id`, this.eventController.getEventById);
        this.router.post(`${this.path}`, validationMiddleware(CreateEventDto), this.eventController.createEvent);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateEventDto, true), this.eventController.updateEvent);
        this.router.delete(`${this.path}/:id`, this.eventController.deleteEvent);
    }
}

export default EventRoute;

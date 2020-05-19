import { NextFunction, Request, Response } from 'express';
import { CreateEventDto } from '../dtos/events.dto';
import EventsService from '../services/events.service';
import { Event } from '../interfaces/events.interface';

class EventsController {
    public eventsService = new EventsService();

    public getEvents = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllEventsData: Event[] = await this.eventsService.findAllEvents();
            res.status(200).json({ data: findAllEventsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public getEventById = async (req: Request, res: Response, next: NextFunction) => {
        const eventId: string = req.params.id;

        try {
            const findOneEventData: Event | Event[] = await this.eventsService.findEventById(eventId);
            res.status(200).json({ data: findOneEventData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    }

    public createEvent = async (req: Request, res: Response, next: NextFunction) => {
        const eventData: CreateEventDto = req.body;

        try {
            const createEventData: Event = await this.eventsService.createEvent(eventData);
            res.status(201).json({ data: createEventData, message: 'created' });
        } catch (error) {
            next(error);
        }
    }

    public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
        const eventId: string = req.params.id;
        const eventData: Event = req.body;

        try {
            const updateEventData: Event = await this.eventsService.updateEvent(eventId, eventData);
            res.status(200).json({ data: updateEventData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    }

    public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
        const eventId: string = req.params.id;

        try {
            const deleteEventData: Event = await this.eventsService.deleteEventData(eventId);
            res.status(200).json({ data: deleteEventData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    }
}

export default EventsController;
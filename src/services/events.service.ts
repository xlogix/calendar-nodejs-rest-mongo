import HttpException from '../exceptions/HttpException';
import eventModel from '../models/event.model';
import { isEmptyObject } from '../utils/util';
import { CreateEventDto } from 'dtos/events.dto';
import { Event } from 'interfaces/events.interface';

class EventsService {
    public events = eventModel;

    public async findAllEvents(): Promise<Event[]> {
        const users: Event[] = await this.events.find();
        return users;
    }

    public async findEventById(eventId: string): Promise<Event> {
        const findEvent: Event = await this.events.findById(eventId);
        if (!findEvent) throw new HttpException(409, "You're not an event");

        return findEvent;
    }

    public async createEvent(meetingData: CreateEventDto): Promise<Event> {
        if (isEmptyObject(meetingData))
            throw new HttpException(400, "You're not an event");

        const createEventData: Event = await this.events.create({ ...meetingData });

        return createEventData;
    }

    public async updateEvent(eventId: string, eventData: Event): Promise<Event> {
        if (isEmptyObject(eventData)) throw new HttpException(400, "Send more data...");

        const updateEventById: Event = await this.events.findByIdAndUpdate(eventId, { ...eventData });
        if (!updateEventById) throw new HttpException(409, "You're not an event");

        return updateEventById;
    }

    public async deleteEventData(eventId: string): Promise<Event> {
        const updateEventById: Event = await this.events.findByIdAndDelete(eventId);
        if (!updateEventById) throw new HttpException(409, "You're not an event");

        return updateEventById;
    }
}

export default EventsService;
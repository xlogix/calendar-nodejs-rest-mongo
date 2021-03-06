import { uuid } from 'uuidv4';
import HttpException from '../exceptions/HttpException';
import eventModel from '../models/event.model';
import { isEmptyObject } from '../utils/util';
import { CreateEventDto } from 'dtos/events.dto';
import { Event } from 'interfaces/events.interface';
import * as moment from 'moment';
import * as momentBusiness from 'moment-business-days';

momentBusiness.updateLocale('us', {
    workingWeekdays: [1, 2, 3, 4, 5]
});

class EventsService {
    public events = eventModel;

    public async findAllEvents(): Promise<Event[]> {
        const events: Event[] = await this.events.find();
        return events;
    }

    public async findEventById(eventId: string): Promise<Event | Event[]> {
        const findEvent: Event = await this.events.findById(eventId);
        if (!findEvent) throw new HttpException(409, "You're not an event");
        if (findEvent.isRecurring) {
            // Taking endDate till the end of the month (for testing) but it can be configured to be infinite or end at a specific date
            let findEvents = []; findEvents[0] = findEvent;
            let startDate = moment(findEvents[0].startsAt).format();
            let endDate = moment().endOf('month').format();
            // Daily
            if (findEvent.recurrencePattern === "Daily") {
                console.log(" I'm inside Daily");
                let previousEventIndex = 0; let temp: Event;
                while (startDate <= endDate) {
                    temp = JSON.parse(JSON.stringify(findEvents[previousEventIndex]));
                    // Increment the date
                    temp.uid = uuid();
                    temp.startsAt = moment(temp.startsAt).add(1, 'days').format();
                    temp.endsAt = moment(temp.endsAt).add(1, 'days').format();
                    // Increment the index & startDate
                    previousEventIndex++;
                    startDate = moment(temp.endsAt).format();
                    // Push it into the array
                    findEvents.push(temp);
                }
                return findEvents;
            }
            // Weekdays
            else if (findEvent.recurrencePattern === "Weekdays") {
                console.log(" I'm inside Weekdays");
                let previousEventIndex = 0; let temp: Event;
                while (startDate <= endDate) {
                    temp = JSON.parse(JSON.stringify(findEvents[previousEventIndex]));
                    // Increment the date
                    temp.uid = uuid();
                    temp.startsAt = momentBusiness(temp.startsAt).businessAdd(1, 'days').format();
                    temp.endsAt = momentBusiness(temp.endsAt).businessAdd(1, 'days').format();
                    // Increment the index & startDate
                    previousEventIndex++;
                    startDate = moment(temp.endsAt).format();
                    // Push it into the array
                    findEvents.push(temp);
                }
                return findEvents;
            }
            // Weekends
            else if (findEvent.recurrencePattern === "Weekends") {
                console.log(" I'm inside Weekends");
                let previousEventIndex = 0; let temp: Event;
                while (startDate <= endDate) {
                    // Copy Event
                    temp = JSON.parse(JSON.stringify(findEvents[previousEventIndex]));
                    // Add for Saturday
                    temp.uid = uuid();
                    temp.startsAt = moment(temp.startsAt).day(6).format();
                    temp.endsAt = moment(temp.endsAt).day(6).format();
                    // Push it into the array
                    findEvents.push(temp);
                    // Copy Event
                    temp = JSON.parse(JSON.stringify(findEvents[previousEventIndex]));
                    // Add for Sunday
                    temp.uid = uuid();
                    temp.startsAt = moment(temp.startsAt).day(7).format();
                    temp.endsAt = moment(temp.endsAt).day(7).format();
                    // Push it into the array
                    findEvents.push(temp);
                    // Increment the index & startDate
                    previousEventIndex++; startDate = moment(temp.endsAt).add(1, 'days').format();
                }
                return findEvents;
            }
        }
        // Just return a non-recurring event
        return findEvent;
    }

    public async createEvent(eventData: CreateEventDto): Promise<Event> {
        if (isEmptyObject(eventData))
            throw new HttpException(400, "You're not an event");

        const createEventData: Event = await this.events.create({ ...eventData });

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
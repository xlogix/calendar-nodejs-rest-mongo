import { v4 as uuidv4 } from 'uuid';
import HttpException from '../exceptions/HttpException';
import eventModel from '../models/event.model';
import { isEmptyObject } from '../utils/util';
import { CreateEventDto } from 'dtos/events.dto';
import { Event } from 'interfaces/events.interface';
import * as moment from 'moment';
var momentBusiness = require('moment-business-days');

momentBusiness.updateLocale('us', {
    workingWeekdays: [1, 2, 3, 4, 5]
});

class EventsService {
    public events = eventModel;

    public async findAllEvents(): Promise<Event[]> {
        const events: Event[] = await this.events.find();
        return events;
    }

    public async findEventById(eventId: string): Promise<Event> {
        const findEvent: Event = await this.events.findById(eventId);
        if (!findEvent) throw new HttpException(409, "You're not an event");
        if (findEvent.isRecurring) {
            // Taking EndsAt till the end of the month but it can be configured to never end or end at a specific date
            if (findEvent.recurrencePattern == "Daily") {
                console.log(" I'm inside Daily");
                let findEvents = []; findEvents[0] = findEvent;
                let startDate = moment(findEvents[0].startsAt).format('DD');
                let endDate = moment().endOf('month').format('DD');
                let previousEventIndex = 0;
                while (startDate != endDate) {
                    let temp: any = findEvents[previousEventIndex];
                    // Increment the date
                    temp._id = uuidv4();
                    temp.startsAt = moment(temp.startsAt).add(1, 'days').format();
                    temp.endsAt = moment(temp.endsAt).add(1, 'days').format();
                    // Increment the index
                    previousEventIndex++;
                    // Push it into the array
                    findEvents.push(temp);
                }
                return findEvents;
            }
            else if (findEvent.recurrencePattern == "Weekdays") {
                console.log(" I'm inside Weekdays");
                let findEvents = []; findEvents[0] = findEvent;
                let startDate = moment(findEvents[0].startsAt).format('DD');
                let endDate = moment().endOf('month').format('DD');
                let previousEventIndex = 0;
                while (startDate != endDate) {
                    let temp: any = findEvents[previousEventIndex];
                    // Increment the date
                    temp._id = uuidv4();
                    temp.startsAt = momentBusiness(temp.startsAt).businessAdd(1, 'days').format();
                    temp.endsAt = momentBusiness(temp.endsAt).businessAdd(1, 'days').format();
                    // Increment the index
                    previousEventIndex++;
                    // Push it into the array
                    findEvents.push(temp);
                }
                return findEvents;
            }
            else if (findEvent.recurrencePattern == "Weekends") {
                console.log(" I'm inside Weekends");
                let findEvents = []; findEvents[0] = findEvent;
                let startDate = moment(findEvents[0].startsAt).format('DD');
                let endDate = moment().endOf('month').format('DD');
                let previousEventIndex = 0;
                while (startDate != endDate) {
                    let temp: any = findEvents[previousEventIndex];
                    // Increment the date
                    temp._id = uuidv4();
                    temp.startsAt = moment(temp.startsAt).day("Saturday").format();
                    temp.endsAt = moment(temp.endsAt).day("Sunday").format();
                    // Increment the index
                    previousEventIndex++;
                    // Push it into the array
                    findEvents.push(temp);
                    // Increment to the next week
                    temp.startsAt = moment(temp.startsAt).add(1, 'week').format();
                    temp.endsAt = moment(temp.startsAt).add(1, 'week').format();
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
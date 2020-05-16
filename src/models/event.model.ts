import * as mongoose from 'mongoose';
import { Event } from '../interfaces/events.interface';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    startsAt: {
        type: Date,
        default: Date.now()
    },
    endsAt: {
        type: Date,
        default: Date.now()
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: {
        type: Date,
        default: Date.now()
    },
    invitedPeople: []
});

const eventModel = mongoose.model<Event & mongoose.Document>('Event', eventSchema);

export default eventModel;
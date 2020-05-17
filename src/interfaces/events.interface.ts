export interface Event {
    _id: string,
    title: string,
    description: string,
    invitedPeople?: Array<string>,
    isRecurring: false,
    recurrencePattern?: string,
    startsAt: string,
    endsAt: string,
    createDate: Date,
    modifiedDate: Date
}
export interface Event {
    _id: string,
    title: string,
    description: string,
    invitedPeople: Array<string>,
    repeat: string,
    startsAt: Date,
    endsAt: Date,
    createDate: Date,
    modifiedDate: Date
}
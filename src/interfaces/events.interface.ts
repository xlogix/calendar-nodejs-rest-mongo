export interface Event {
    _id: string,
    title: string,
    description: string,
    invitedPeople: Array<string>,
    startDate: Date,
    endDate: Date,
    startHour: string,
    endHour: string
}
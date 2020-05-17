import { IsString, IsDate } from 'class-validator';

export class CreateEventDto {

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    public invitedPeople: Array<string>;

    public startsAt: Date;

    public endsAt: Date;

    public createDate: Date;

    public modifiedDate: Date;
}

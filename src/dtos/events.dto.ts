import { IsDate, IsString } from 'class-validator';

export class CreateEventDto {

    @IsString()
    public title: string;

    @IsString()
    description: string;

    public invitedPeople: Array<string>;

    @IsDate()
    public startDate: Date;

    @IsDate()
    public endDate: Date;

    @IsString()
    public startHour: string;

    @IsString()
    public endHour: string;
}

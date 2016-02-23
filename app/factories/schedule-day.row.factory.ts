import {Injectable} from 'angular2/core';
import {ScheduleDayRow} from '../meal-schedule/schedule-day.row';
import {ScheduleDay} from '../models/schedule-day';

@Injectable()

export class ScheduleDayRowFactory{
    
    public create(scheduleDay: ScheduleDay, isInThePast: boolean) : ScheduleDayRow {
        return new ScheduleDayRow(scheduleDay, isInThePast);
    }
}
import {Injectable} from 'angular2/core';
import {ScheduleDay} from '../../models/schedule-day';
import {ResourceService} from './resource.service'
import 'rxjs/add/operator/map';

@Injectable()

export class ScheduleDayResource {
    
    constructor(private resourceService: ResourceService){ }
    
    public get(from: Date, upTo: Date){
        
        var resourceQuery = `scheduledays?from=${from.getTime()}&upto=${upTo.getTime()}`;
        
        return this.resourceService.get(resourceQuery)
            .map(days => {
                days.forEach(day => {
                    
                    day.day = new Date(day.day);
                });
                
                return days;
            });
    }
    
    public put(scheduleDay: ScheduleDay) : any {
        
        var resouceLocation = `scheduledays/${scheduleDay.day.getTime()}`;
        
        return this.resourceService.put(resouceLocation, scheduleDay);
    }
    
    public delete(scheduleDay: ScheduleDay) : any {
        
        var resouceLocation = `scheduledays/${scheduleDay.day.getTime()}`;

        return this.resourceService.delete(resouceLocation);
    }
}
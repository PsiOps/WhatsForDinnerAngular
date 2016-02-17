import {Injectable} from 'angular2/core';
import {ScheduleDay} from '../../models/schedule-day';
import {ResourceService} from './resource.service'

@Injectable()

export class ScheduleDayResource {
    
    constructor(private resourceService: ResourceService){ }
    
    public get(): any {
        
        return this.resourceService.get('scheduledays');
    }
    
    public get(from: Date, upTo: Date){
        
        var resourceQuery = `scheduledays?from=${from}&upto=${upTo}`;
        
        return this.resourceService.get(resourceQuery);
    }
    
    public post(scheduleDay: ScheduleDay) : any {
    
        return this.resourceService.post('scheduledays', scheduleDay);
    }
    
    public put(scheduleDay: ScheduleDay) : any {
        
        if(!scheduleDay._id)
            throw Error("Cannot PUT a ScheduleDay without valid Id");
        
        var resouceLocation = `scheduledays/${scheduleDay._id}`;
        
        return this.resourceService.put(resouceLocation, scheduleDay);
    }
    
    public delete(scheduleDay: ScheduleDay) : any {
        
        if(!scheduleDay._id)
            return {};
            
        var resouceLocation = `scheduledays/${scheduleDay._id}`;

        return this.resourceService.delete(resouceLocation);
    }
}
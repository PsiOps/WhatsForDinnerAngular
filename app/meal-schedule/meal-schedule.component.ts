import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ScheduleDayResource} from '../services/web/schedule-day.resource';

@Component({
    selector: 'meal-schedule',
    templateUrl: 'app/meal-schedule/meal-schedule.component.html',
    styleUrls: ['app/meal-schedule/meal-schedule.css']
})

export class MealScheduleComponent implements OnInit
{
    constructor(private scheduleResource: ScheduleDayResource){};
    
    ngOnInit() {
        
    };
    
}
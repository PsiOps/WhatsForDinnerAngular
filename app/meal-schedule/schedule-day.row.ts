import {Recipe} from '../models/recipe';
import {ScheduleDay} from '../models/schedule-day';

export class ScheduleDayRow{
    
    constructor(scheduleDay: ScheduleDay, isInThePast: boolean){
        
        this.day = scheduleDay.day;
        this.isInThePast = isInThePast;

        if(!scheduleDay.recipe) return;
        
        this.recipeId = scheduleDay.recipe._id;
        this.recipe = scheduleDay.recipe;
    }
    
    public day: Date;
    public recipeId: string;
    public recipe: Recipe;
    public isInThePast: boolean;
}
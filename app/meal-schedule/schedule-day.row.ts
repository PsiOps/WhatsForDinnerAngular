import {Recipe} from '../models/recipe';
import {ScheduleDay} from '../models/schedule-day';

export class ScheduleDayRow{
    
    constructor(scheduleDay: ScheduleDay, isInThePast: boolean){
        
        this.day = scheduleDay.day;
        this.recipeId = scheduleDay.recipeId;
        this.recipe = scheduleDay.recipe;
        this.isInThePast = isInThePast;
    }
    
    public day: Date;
    public recipeId: string;
    public recipe: Recipe;
    public isInThePast: boolean;
    
}
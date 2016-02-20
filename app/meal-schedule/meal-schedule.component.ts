import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ScheduleDayResource} from '../services/web/schedule-day.resource';
import {ScheduleDay} from '../models/ScheduleDay'
import {Recipe} from '../models/Recipe'
import {RecipeEventAggregator} from '../services/recipe.event-aggregator';

@Component({
    selector: 'meal-schedule',
    templateUrl: 'app/meal-schedule/meal-schedule.component.html',
    styleUrls: ['app/meal-schedule/meal-schedule.css']
})

export class MealScheduleComponent implements OnInit
{
    public scheduleDays : ScheduleDay[];
    
    public selectedDay: ScheduleDay;
    
    constructor(private scheduleResource: ScheduleDayResource,
        private recipeEventAggregator: RecipeEventAggregator){};
    
    ngOnInit() {
        
        this.registerToRecipeEvents();
        
        this.getSchedule();
    };
    
    private getSchedule() : void {
      
        var now = moment();
      
        this.scheduleResource.get(now.add(-7, 'day'), now.add(14, 'day'))
            .subscribe(days => this.setScheduleAndSelectedDay(days),
                error => onHttpError(error));
    };
    
    private setScheduleAndSelectedDay(scheduleDays : ScheduleDay[]){
        
        this.scheduleDays = scheduleDays
        
        if(this.scheduleDays.length == 0) return;
        
        this.selectedDay = this.getNextScheduleTarget(0);
    };
    
    private getNextScheduleTarget(startIndex: number){
      
        for (i = startIndex; i < this.scheduleDays.length; i++) { 
            
            var scheduleDay = this.scheduleDays[i];
            
            if(this.isInThePast(scheduleDay.day)){
                continue;
            }
            
            if(scheduleDay.recipeId == null)
                return scheduleDay;
        }
    };
    
    private isInThePast(scheduleDay: ScheduleDay) : boolean {
        
        var dayMoment = moment(scheduleDay.day).startOf('day');
        
        console.log(dayMoment.format());
        
        var today = moment().startOf('day');
        
        console.log(today.format());
        
        if(dayMoment.isBefore(today)){
            console.log("IsBefore true")
            return true;
        }

        console.log("IsBefore false");
        return false;
    }
    
    private registerToRecipeEvents(){
        this.recipeEventAggregator.recipeMarkedForScheduling.subscribe(recipe => this.onRecipeMarkedForScheduling(recipe));
        this.recipeEventAggregator.recipeUpdated.subscribe(recipe => this.onRecipeUpdated(recipe));
        this.recipeEventAggregator.recipeDeleted.subscribe(recipe => this.onRecipeDeleted(recipe));
    };
    
    public onSelect(day: ScheduleDay) : void {

        if(this.isInThePast(day)) return;

        this.selectedDay = day;
    };
    
    public onClear(day: ScheduleDay) : void {
        
        this.selectedDay.recipeId = null;
        this.selectedDay.recipe = null;
        
        this.scheduleResource.delete(day);
    }
    
    private onRecipeMarkedForScheduling(recipe: Recipe){
        
        var isPost = this.selectedDay.recipeId == undefined;
        
        this.selectedDay.recipeId = recipe._id;
        this.selectedDay.recipe = recipe;
        
        if(isPost){
            this.scheduleResource.post(this.selectedDay);
        }
        else{
            this.scheduleResource.put(this.selectedDay);
        }
        
        var nextTargetStartIndex = this.scheduleDays.indexOf(this.selectedDay) + 1;
        
        this.selectedDay = this.getNextScheduleTarget(nextTargetStartIndex);
    }
    
    private hasRecipe(day: ScheduleDay){
        
        console.log(this);
        console.log(day);
        
        return day.recipeId == this._id;
    };
    
    private onRecipeUpdated(recipe: Recipe){
        
        this.scheduleDays.filter(this.hasRecipe, recipe).forEach(day => {
            
            day.recipe.name = recipe.name;
        });
    };
    
    private onRecipeDeleted(recipe: Recipe){
        
        this.scheduleDays.filter(this.hasRecipe, recipe).forEach(day => {
            
            day.recipeId = null;
            day.recipe = null;
        });
    };
    
    private onHttpError(error: any){
        console.log("An error was thrown: " + error.text());
    };
}
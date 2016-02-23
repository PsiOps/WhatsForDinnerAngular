import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ScheduleDayResource} from '../services/web/schedule-day.resource';
import {ScheduleDay} from '../models/ScheduleDay'
import {Recipe} from '../models/Recipe'
import {RecipeEventAggregator} from '../services/recipe.event-aggregator';
import {ScheduleDayRowFactory} from '../factories/schedule-day.row.factory';
import {ScheduleDayRow} from './schedule-day.row';

@Component({
    selector: 'meal-schedule',
    providers: [ScheduleDayRowFactory],
    templateUrl: 'app/meal-schedule/meal-schedule.component.html',
    styleUrls: ['app/meal-schedule/meal-schedule.css']
})

export class MealScheduleComponent implements OnInit
{
    public scheduleDays : ScheduleDayRow[] = [];
    
    public selectedDay: ScheduleDay;
    
    constructor(private scheduleResource: ScheduleDayResource,
        private recipeEventAggregator: RecipeEventAggregator,
        private scheduleDayRowFactory: ScheduleDayRowFactory){};
    
    ngOnInit() {
        
        this.registerToRecipeEvents();
        
        this.getSchedule();
    };
    
    private getSchedule() : void {
      
        var from = moment().subtract(7, 'day').toDate();
        var upTo = moment().add(14, 'day').toDate();
      
        this.scheduleResource.get(from, upTo)
            .subscribe(days => this.setScheduleAndSelectedDay(days),
                error => this.onHttpError(error));
    };
    
    private setScheduleAndSelectedDay(scheduleDays : ScheduleDay[]){
        
        scheduleDays.forEach(dayModel => {
            
            this.scheduleDays.push(this.scheduleDayRowFactory.create(dayModel, this.isInThePast(dayModel)))
        });
        
        if(this.scheduleDays.length == 0) return;
        
        this.selectedDay = this.getNextScheduleTarget(0);
    };
    
    private getNextScheduleTarget(startIndex: number){
      
        for (i = startIndex; i < this.scheduleDays.length; i++) { 
            
            var scheduleDay = this.scheduleDays[i];
            
            if(this.isInThePast(scheduleDay)){
                continue;
            }
            
            if(scheduleDay.recipeId == null)
                return scheduleDay;
        }
    };
    
    private isInThePast(scheduleDay: ScheduleDay) : boolean {
        
        var dayMoment = moment(scheduleDay.day).startOf('day');
        
        var today = moment().startOf('day');
        
        if(dayMoment.isBefore(today)){
            return true;
        }

        return false;
    }
    
    private registerToRecipeEvents(){
        
        this.recipeEventAggregator.recipeMarkedForScheduling
            .subscribe(recipe => this.onRecipeMarkedForScheduling(recipe));
            
        this.recipeEventAggregator.recipeUpdated
            .subscribe(recipe => this.onRecipeUpdated(recipe));
            
        this.recipeEventAggregator.recipeDeleted
            .subscribe(recipe => this.onRecipeDeleted(recipe));
    };
    
    public onSelect(day: ScheduleDay) : void {

        if(this.isInThePast(day)) return;

        this.selectedDay = day;
    };
    
    public onClear(day: ScheduleDay) : void {
        
        if(this.isInThePast(day)) return;

        day.recipeId = null;
        day.recipe = null;
        
        this.scheduleResource.delete(day).subscribe(
            (response) => console.log(`Succes: ${response.message}`),
            (error) => console.log(`Error: ${error.message}`));
    }
    
    private onRecipeMarkedForScheduling(recipe: Recipe){
        
        this.selectedDay.recipeId = recipe._id;
        this.selectedDay.recipe = recipe;
        
        this.scheduleResource.put(this.selectedDay).subscribe(
            this.onHttpSucces, this.onHttpError);
        
        var nextTargetStartIndex = this.scheduleDays.indexOf(this.selectedDay) + 1;
        
        this.selectedDay = this.getNextScheduleTarget(nextTargetStartIndex);
    }
    
    private hasRecipe(day: ScheduleDay){
        
        return day.recipeId == this._id; // this here is the recipe
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
        console.log("An error was thrown: " + error.text);
    };
    
    private onHttpSucces(response: any){
        console.log("Succes: " + response.message);
    };
}
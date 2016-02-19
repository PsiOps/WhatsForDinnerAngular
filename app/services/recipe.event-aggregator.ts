import {Injectable} from 'angular2/core';
import {EventEmitterFactory} from "../factories/event-emitter.factory"
import {Recipe} from '../models/recipe';

@Injectable()

export class RecipeEventAggregator{
    
    constructor(private _eventEmitterFactory : EventEmitterFactory){
        this.recipeMarkedForScheduling = this._eventEmitterFactory.create();
        this.recipeUpdated = this._eventEmitterFactory.create();
        this.recipeDeleted = this._eventEmitterFactory.create();
    }
    
    public recipeMarkedForScheduling: EventEmitter<Recipe>;
    
    public onRecipeMarkedForScheduling(recipe: Recipe){
        
        this.recipeMarkedForScheduling.emit(recipe);
    }
    
    public recipeUpdated: EventEmitter<Recipe>;
    
    public onRecipeUpdated(recipe: Recipe){
        
        this.recipeUpdated.emit(recipe);
    }
    
    public recipeDeleted: EventEmitter<Recipe>;
    
    public onRecipeDeleted(recipe: Recipe){
        
        this.recipeDeleted.emit(recipe);
    }
}
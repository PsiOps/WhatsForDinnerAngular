import {Injectable} from 'angular2/core';
import {EventEmitterFactory} from "../factories/event-emitter.factory"
import {Recipe} from '../models/recipe';

@Injectable()

export class RecipeSelectionService{
    
    constructor(private _eventEmitterFactory : EventEmitterFactory){
        this.recipeSelected = this._eventEmitterFactory.create();
    }
    
    public recipeSelected: EventEmitter<Recipe>;
    
    public scheduleRecipe(recipe: Recipe){
        
        this.recipeSelected.emit(recipe);
    }
}
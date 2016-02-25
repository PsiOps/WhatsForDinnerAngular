import {Component} from 'angular2/core';
import {Recipe} from '../../models/recipe';
import {Ingredient} from '../../models/ingredient';
import {EventEmitterFactory} from "../../factories/event-emitter.factory"

@Component({
    selector: 'recipe-form',
    templateUrl: 'app/recipe-list/recipe-form/recipe-form.component.html',
    styleUrls: ['app/recipe-list/recipe-form/recipe-form.css'],
    inputs: ['recipe', 'isVisible'],
    outputs: ['close', 'submit']
})

export class RecipeFormComponent
{
    constructor(private _eventEmitterFactory: EventEmitterFactory){
        this.close = this._eventEmitterFactory.create();
        this.submit = this._eventEmitterFactory.create();
    }
    
    private _recipe: Recipe;
    public get recipe(): Recipe {
        return this._recipe;
    };
    public set recipe(value: Recipe){
        this._recipe = value;
        
        
        if(!this._recipe) return;
        
        this.ingredients = this._recipe.ingredients;
        
        var ingredient = new Ingredient();
        
        ingredient.name = "Add ingredient..."
        
        this.ingredients.push(ingredient);
    }
    
    public ingredients: Ingredient[] = [];
    
    public isVisible: Boolean;
    
    public close: EventEmitter;
    
    public onCloseButtonClicked() : void {
        this.close.next();
    }
    
    public submit: EventEmitter;
    
    public onSubmitButtonClicked() : void {
        this.submit.next();
    }
}
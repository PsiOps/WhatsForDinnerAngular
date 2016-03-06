import {Component} from 'angular2/core';
import {Recipe} from '../../models/recipe';
import {RecipeIngredient} from '../../models/recipe-ingredient';
import {EventEmitterFactory} from "../../factories/event-emitter.factory";
import {RecipeIngredientRowFactory} from "../../factories/recipe-ingredient.row.factory";
import {RecipeIngredientRow} from "./recipe-ingredient.row";

@Component({
    selector: 'recipe-form',
    templateUrl: 'app/recipe-list/recipe-form/recipe-form.component.html',
    providers: [RecipeIngredientRowFactory],
    styleUrls: ['app/recipe-list/recipe-form/recipe-form.css'],
    inputs: ['recipe', 'isVisible'],
    outputs: ['close', 'submit']
})

export class RecipeFormComponent
{
    constructor(eventEmitterFactory: EventEmitterFactory,
                private _recipeIngredientRowFactory: RecipeIngredientRowFactory){
        this.close = eventEmitterFactory.create();
        this.submit = eventEmitterFactory.create();
    }
    
    private _recipe: Recipe;
    public get recipe(): Recipe {
        return this._recipe;
    };
    public set recipe(value: Recipe){
        
        console.log("Recipe set");
        
        this._recipe = value;
        
        if(!this._recipe) return;
        
        this._recipe.ingredients.forEach(ingredient => {
            
            var row = this._recipeIngredientRowFactory.create(ingredient);
            
            this.ingredients.push(row);
        });
        
        this.addInsertRow();
    }
    
    public ingredients: RecipeIngredient[] = [];
    
    public isVisible: Boolean;
    
    public close: EventEmitter;
    
    public onCloseButtonClicked() : void {
        this.close.next();
    }
    
    public submit: EventEmitter;
    
    public onSubmitButtonClicked() : void {
        
        this.recipe.ingredients = [];
        
        this.ingredients.filter(this.isNotInsertRow).forEach(ingredientRow => {
            
            console.log(ingredientRow);
            
            var ingredient = {_id: ingredientRow.ingredientId, name: ingredientRow.ingredient};
            
            var recipeIngredient = {amount: ingredientRow.amount, unit: ingredientRow.unit, ingredient: ingredient};

            console.log(recipeIngredient);

            this.recipe.ingredients.push(recipeIngredient);
        });
        
        this.submit.next();
    }
    
    private isNotInsertRow(ingredientRow: RecipeIngredientRow) : boolean {
        
        return ingredientRow.isInsertRow == false;
    }
    
    public onRowEdit(isInsertRow: boolean) : void {
        
        if(!isInsertRow) return;
        
        this.ingredients[this.ingredients.length-1].isInsertRow = false;
        
        this.addInsertRow();
    }
    
    private addInsertRow(): void {
        
        var insertRow = this._recipeIngredientRowFactory.createInsertRow()
        
        this.ingredients.push(insertRow);
    }
}
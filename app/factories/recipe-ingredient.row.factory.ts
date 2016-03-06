import {Injectable} from 'angular2/core';
import {RecipeIngredientRow} from '../recipe-list/recipe-form/recipe-ingredient.row';
import {RecipeIngredient} from '../models/recipe-ingredient';

@Injectable()

export class RecipeIngredientRowFactory{
    
    public create(recipeIngredient: RecipeIngredient) : RecipeIngredientRow {
        return new RecipeIngredientRow(recipeIngredient, false);
    }
    
    public createInsertRow() : RecipeIngredientRow {
        
        var recipeIngredient = new RecipeIngredient();
        return new RecipeIngredientRow(recipeIngredient, true);
    }
}
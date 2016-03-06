import {RecipeIngredient} from '../models/recipe-ingredient';

export class RecipeIngredientRow{
    
    constructor(recipeIngredient: RecipeIngredient, isInsertRow: boolean){
        
        this.amount = recipeIngredient.amount;
        this.unit = recipeIngredient.unit;
        this.isInsertRow = isInsertRow;
        
        if(!recipeIngredient.ingredient) return;
        
        this.ingredient = recipeIngredient.ingredient.name;
        this.ingredientId = recipeIngredient.ingredient._id;
    }
    
    ingredient: string;
    ingredientId: string;
    amount: number;
    unit: string;
    isInsertRow: boolean;
}
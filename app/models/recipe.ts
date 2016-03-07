import {RecipeIngredient} from './recipe-ingredient';

export class Recipe{
    name: string;
    description: string;
    ingredients: RecipeIngredient[] = [];
}
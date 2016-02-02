import {Component} from 'angular2/core';
import {Recipe} from '../../models/recipe';

@Component({
    selector: 'recipe-form',
    templateUrl: 'app/recipe-list/recipe-form/recipe-form.component.html',
    styleUrls: ['app/recipe-list/recipe-form/recipe-form.css'],
    inputs: ['recipe']
})

export class RecipeFormComponent{
    public recipe: Recipe;
}
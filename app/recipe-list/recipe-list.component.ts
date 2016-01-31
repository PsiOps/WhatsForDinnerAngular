import {Component} from 'angular2/core';
import {Recipe} from '../models/recipe'

@Component({
    selector: 'recipe-list',
    templateUrl: 'app/recipe-list/recipe-list.component.html'
})

export class RecipeListComponent{
    public recipes = RECIPES;
}

var RECIPES : Recipe[] = [
    {"name": "Pannekoeken", "description": "Bak ze in een pan"},
    {"name": "Nasi", "description": "Gekruide gebakken rijst uit de wok"},
    ]
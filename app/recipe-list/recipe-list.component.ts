import {Component} from 'angular2/core';
import {Recipe} from '../models/recipe';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {OnInit} from 'angular2/core';
import {RecipeResource} from '../services/recipe.resource';

@Component({
    selector: 'recipe-list',
    templateUrl: 'app/recipe-list/recipe-list.component.html',
    directives: [RecipeFormComponent],
    styleUrls: ['app/recipe-list/recipe-list.css']
    //providers: ['RecipeResource'] Inherited from AppComponent
})

export class RecipeListComponent implements OnInit
{
    constructor(private _recipeResource: RecipeResource){}
    
    ngOnInit() {
        this.getRecipes();
    }
    
    getRecipes(){
        this._recipeResource.Get().then(recipes => this.recipes = recipes);
    }
    
    public recipes;
    
    public selectedRecipe: Recipe;
    
    onSelect(recipe: Recipe){
        this.selectedRecipe = recipe;
    }
}

var RECIPES : Recipe[] = [
    {"name": "Pannekoeken", "description": "Bak ze in een pan"},
    {"name": "Nasi", "description": "Gekruide gebakken rijst uit de wok"},
    ]
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
    
    private getRecipes() : void {
        this._recipeResource.Get().then(recipes => this.recipes = recipes);
    }
    
    public recipes : Recipe[];
    public selectedRecipe: Recipe;
    public isCardVisible: Boolean;
    
    public onSelect(recipe: Recipe) : void {
        
        if(isCardVisible) return;
        
        this.selectedRecipe = recipe;
    }
    
    public onEditButtonClicked(recipe: Recipe): void {
        this.selectedRecipe = recipe;
        this.isCardVisible = true;
    }
    
    public onFormClosed() : void {
        this.isCardVisible = false;
    }
}
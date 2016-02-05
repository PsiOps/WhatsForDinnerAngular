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
})

export class RecipeListComponent implements OnInit
{
    constructor(private _recipeResource: RecipeResource){}
    
    ngOnInit() {
        this.getRecipes();
    }
    
    private getRecipes() : void {
        this._recipeResource.Get().subscribe(
            recipes => this.recipes = recipes,
            error => console.log("An error was thrown: " + error.text()));
    }
    
    public recipes : Recipe[];
    public selectedRecipe: Recipe;
    public isCardVisible: Boolean;
    
    public onSelect(recipe: Recipe) : void {
        if(this.isCardVisible) return;
        
        this.selectedRecipe = recipe;
    }
    
    public onEditButtonClicked(recipe: Recipe): void {
        this.selectedRecipe = recipe;
        this.isCardVisible = true;
    }
    
    public onFormClosed() : void {
        this.isCardVisible = false;
    }
    
    public onFormSubmit() : void {
        this._recipeResource.Post(this.selectedRecipe).subscribe(
            res => console.log(res),
            error => console.log("An error was thrown: " + error.text()));
    }
}
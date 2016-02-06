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
            error => error => onHttpError(error)));
    }
    
    public recipes : Recipe[];
    public selectedRecipe: Recipe;
    public isCardVisible: Boolean;
    
    public onSelect(recipe: Recipe) : void {
        if(this.isCardVisible) return;
        
        this.selectedRecipe = recipe;
    }
    
    public onAddButtonClicked(): void {
        
        var recipe = new Recipe();
        
        this.recipes.unshift(recipe);
        
        this.selectedRecipe = recipe;
        this.isCardVisible = true;
    }
    
    public onEditButtonClicked(recipe: Recipe): void {
        this.selectedRecipe = recipe;
        this.isCardVisible = true;
    }
    
    public onDeleteButtonClicked(recipe: Recipe): void {
        this.selectedRecipe = undefined;
        
        this._recipeResource.Delete(recipe)
            .subscribe(
                res => {
                    console.log(res);
                    this.getRecipes();
                },
                error => this.onHttpError(error)));
    }
    
    public onFormClosed() : void {
        this.isCardVisible = false;
    }
    
    public onFormSubmit() : void {
        
        console.log(this.selectedRecipe._id);
        
        if(this.selectedRecipe._id){
            this._recipeResource.Put(this.selectedRecipe)
                .subscribe(
                    res => console.log(res),
                    error => this.onHttpError(error)));    

            return;
        }
            
        this._recipeResource.Post(this.selectedRecipe)
            .subscribe(
                res => console.log(res),
                error => this.onHttpError(error)));
    }
    
    private onHttpError(error: any){
        console.log("An error was thrown: " + error.text()
    }
}
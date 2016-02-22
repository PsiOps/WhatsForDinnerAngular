import {Component} from 'angular2/core';
import {Recipe} from '../models/recipe';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';
import {OnInit} from 'angular2/core';
import {RecipeResource} from '../services/web/recipe.resource';
import {RecipeFactory} from '../factories/recipe.factory';
import {RecipeEventAggregator} from '../services/recipe.event-aggregator';

@Component({
    selector: 'recipe-list',
    templateUrl: 'app/recipe-list/recipe-list.component.html',
    providers: [RecipeFactory],
    directives: [RecipeFormComponent],
    styleUrls: ['app/recipe-list/recipe-list.css']
})

export class RecipeListComponent implements OnInit
{
    constructor(private _recipeResource: RecipeResource,
                private _recipeFactory: RecipeFactory,
                private recipeEventAggregator: RecipeEventAggregator){};
    
    ngOnInit() {
        this.getRecipes();
    };
    
    private getRecipes() : void {
        this._recipeResource.get().subscribe(
            recipes => this.recipes = recipes,
            error => this.onHttpError(error)));
    };
    
    public recipes : Recipe[] = [];
    public selectedRecipe: Recipe;
    public isCardVisible: Boolean;
    
    public onSelect(recipe: Recipe) : void {
        if(this.isCardVisible) return;
        
        this.selectedRecipe = recipe;
    };
    
    public onAddButtonClicked(): void {
        
        var recipe = this._recipeFactory.create();
        
        this.recipes.unshift(recipe);
        
        this.selectedRecipe = recipe;
        this.isCardVisible = true;
    };
    
    public onEditButtonClicked(recipe: Recipe): void {
        this.selectedRecipe = recipe;
        this.isCardVisible = true;
    };
    
    public onSchedule(recipe: Recipe): void {
        
        this.recipeEventAggregator.onRecipeMarkedForScheduling(recipe);
    };
    
    public onDeleteButtonClicked(recipe: Recipe): void {
        this.selectedRecipe = undefined;
        
        this._recipeResource.delete(recipe)
            .subscribe(
                res => {
                    console.log(res);
                    this.getRecipes();
                },
                error => this.onHttpError(error)));
                
        this.recipeEventAggregator.onRecipeDeleted(recipe);
    };
    
    public onFormClosed() : void {
        this.isCardVisible = false;
    };
    
    public onFormSubmit() : void {
        
        if(this.selectedRecipe._id){
            this._recipeResource.put(this.selectedRecipe)
                .subscribe(
                    res => console.log(res),
                    error => this.onHttpError(error)));    

            this.recipeEventAggregator.onRecipeUpdated(this.selectedRecipe);

            return;
        }
            
        this._recipeResource.post(this.selectedRecipe)
            .subscribe(
                res => {
                    console.log(res);
                    this.selectedRecipe._id = res._id;
                },
                error => this.onHttpError(error)));
    };
    
    private onHttpError(error: any){
        
        console.log("An error was thrown: " + error.text);
    };
}
import {Component} from 'angular2/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeResource} from './services/recipe.resource';

@Component({
    selector: 'wfd-app',
    providers: [RecipeResource],
    directives: [RecipeListComponent],
    templateUrl: 'app/app.component.html'
})

export class AppComponent { }
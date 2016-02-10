import {Component} from 'angular2/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeResource} from './services/web/recipe.resource';
import {RecipeSelectionService} from './services/recipe-selection.service';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'wfd-app',
    providers: [RecipeResource, RecipeSelectionService, HTTP_PROVIDERS],
    directives: [RecipeListComponent],
    templateUrl: 'app/app.component.html'
})

export class AppComponent { }
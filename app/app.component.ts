import {Component} from 'angular2/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';

@Component({
    selector: 'wfd-app',
    directives: [RecipeListComponent, RecipeFormComponent],
    templateUrl: 'app/app.component.html'
})
export class AppComponent { 
    
    
    
}
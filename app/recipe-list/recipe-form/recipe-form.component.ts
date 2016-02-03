import {Component, EventEmitter} from 'angular2/core';
import {Recipe} from '../../models/recipe';

@Component({
    selector: 'recipe-form',
    templateUrl: 'app/recipe-list/recipe-form/recipe-form.component.html',
    styleUrls: ['app/recipe-list/recipe-form/recipe-form.css'],
    inputs: ['recipe', 'isVisible'],
    outputs: ['close']
})

export class RecipeFormComponent
{
    public recipe: Recipe;
    
    public isVisible: Boolean;
    
    public close: EventEmitter = new EventEmitter();
    
    public onCloseButtonClicked() : void {
        this.close.next();
    }
}
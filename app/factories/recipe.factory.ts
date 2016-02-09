import {Injectable} from 'angular2/core';
import {Recipe} from '../models/recipe';

@Injectable()

export class RecipeFactory{
    
    public create() : Recipe {
        return new Recipe();
    }
}
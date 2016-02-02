import {Injectable} from 'angular2/core';
import {Recipe} from '../models/recipe';

@Injectable()

export class RecipeResource {
    
    Get(): Promise<Recipe[]>{
        return new Promise<Recipe[]>(resolve => resolve(RECIPES));
    }
}

var RECIPES : Recipe[] = [
    {"name": "Pannekoeken", "description": "Bak ze in een pan"},
    {"name": "Nasi", "description": "Gekruide gebakken rijst uit de wok"},
    ]
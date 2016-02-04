import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Recipe} from '../models/recipe';
import 'rxjs/add/operator/map';

@Injectable()

export class RecipeResource {
    
    constructor(private _http: Http){ }
    
    public Get(): any {
        
        return this._http.get('https://188.226.154.191:8080/api/recipes')
            .map(res => res.json());
    }
}

var RECIPES : Recipe[] = [
    {"name": "Pannekoeken", "description": "Bak ze in een pan"},
    {"name": "Nasi", "description": "Gekruide gebakken rijst uit de wok"},
    ]
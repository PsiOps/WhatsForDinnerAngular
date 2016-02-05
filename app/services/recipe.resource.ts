import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Recipe} from '../models/recipe';
import 'rxjs/add/operator/map';

@Injectable()

export class RecipeResource {
    
    constructor(private _http: Http){ }
    
    public Get(): any {
        
        return this._http.get('https://lemmingsontour.nl:3002/api/recipes')
            .map(res => res.json());
    }
    
    public Post(recipe: Recipe) : any {
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
    
        return this._http.post('https://lemmingsontour.nl:3002/api/recipes', JSON.stringify(recipe), {headers:headers})
            .map(res => res.json())
    }
}
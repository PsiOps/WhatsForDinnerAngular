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
    
        return this._http.post('https://lemmingsontour.nl:3002/api/recipes', JSON.stringify(recipe), {headers:this.getHeaders()})
            .map(res => res.json())
    }
    
    public Put(recipe: Recipe) : any {
        
        if(recipe._id == 0)
            throw Error("Cannot PUT a Recipe without valid Id")
        
        var resouceLocation = `https://lemmingsontour.nl:3002/api/recipes/${recipe._id}`
        
        return this._http.put(resouceLocation, JSON.stringify(recipe), {headers:this.getHeaders()})
            .map(res => res.json())
    }
    
    public Delete(recipe: Recipe) : any {
        
        if(recipe._id == 0)
            return {};
            
        var resouceLocation = `https://lemmingsontour.nl:3002/api/recipes/${recipe._id}`

        return this._http.delete(resouceLocation, {headers:this.getHeaders()})
            .map(res => res.json())
    }
    
    private getHeaders() : Headers {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
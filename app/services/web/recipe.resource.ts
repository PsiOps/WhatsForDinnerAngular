import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Recipe} from '../../models/recipe';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app-config';

@Injectable()

export class RecipeResource {
    
    private _baseUrl : String;
    
    constructor(private _http: Http, appConfig: AppConfig){
        //_baseUrl = "https://whats-for-dinner-service-psiops.c9users.io/api/";
        _baseUrl = appConfig.baseUrl;
    }
    
    public get(): any {
        
        return this._http.get(_baseUrl + 'recipes')
            .map(res => res.json());
    }
    
    public post(recipe: Recipe) : any {
    
        return this._http.post(_baseUrl + 'recipes', JSON.stringify(recipe), {headers:this.getHeaders()})
            .map(res => res.json())
    }
    
    public put(recipe: Recipe) : any {
        
        if(!recipe._id)
            throw Error("Cannot PUT a Recipe without valid Id")
        
        var resouceLocation = _baseUrl + `recipes/${recipe._id}`
        
        return this._http.put(resouceLocation, JSON.stringify(recipe), {headers:this.getHeaders()})
            .map(res => res.json())
    }
    
    public delete(recipe: Recipe) : any {
        
        if(!recipe._id)
            return {};
            
        var resouceLocation = _baseUrl + `recipes/${recipe._id}`

        return this._http.delete(resouceLocation, {headers:this.getHeaders()})
            .map(res => res.json())
    }
    
    private getHeaders() : Headers {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
import {Injectable} from 'angular2/core';
import {Recipe} from '../../models/recipe';
import {ResourceService} from './resource.service'

@Injectable()

export class RecipeResource {
    
    constructor(private resourceService: ResourceService){ }
    
    public get(): any {
        
        return this.resourceService.get('recipes');
    }
    
    public post(recipe: Recipe) : any {
    
        return this.resourceService.post('recipes', recipe);
    }
    
    public put(recipe: Recipe) : any {
        
        if(!recipe._id)
            throw Error("Cannot PUT a Recipe without valid Id");
        
        var resouceLocation = `recipes/${recipe._id}`;
        
        return this.resourceService.put(resouceLocation, recipe);
    }
    
    public delete(recipe: Recipe) : any {
        
        if(!recipe._id)
            return {};
            
        var resouceLocation = `recipes/${recipe._id}`;

        return this.resourceService.delete(resouceLocation);
    }
}
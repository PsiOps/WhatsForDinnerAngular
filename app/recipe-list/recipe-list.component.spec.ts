import {RecipeListComponent} from './recipe-list.component';

describe("Recipe List Behaviour", () => {
    
    var recipeListComponent : RecipeListComponent;
    var mockObservable : any;
    var mockResource;
    
    beforeEach(() => {
        
        mockResource = {Get: function(){}};
        
        mockObservable = {subscribe : function(){}};
        
        spyOn(mockObservable, 'subscribe');
        
        spyOn(mockResource, 'Get').and.returnValue(mockObservable);
        
        recipeListComponent = new RecipeListComponent(mockResource);
        
        recipeListComponent.ngOnInit();
    });
    
    it("Calls Get on the Resource", () => {
        expect(mockResource.Get).toHaveBeenCalled();
    });
    
    it("Subscribes to the result", () => {
        expect(mockObservable.subscribe).toHaveBeenCalled();
    });
});
import {RecipeResource} from "./recipe.resource";

describe("Recipe Resource", () => {
    
    var resourceServiceMock : any = {
        get: function(){},
        post: function(){},
        put: function(){},
        delete: function(){}
    };
    
    var recipeResource : RecipeResource;
    
    beforeEach(() => {
             
        spyOn(resourceServiceMock, 'get');
        spyOn(resourceServiceMock, 'post');
        spyOn(resourceServiceMock, 'put');
        spyOn(resourceServiceMock, 'delete');
        
        recipeResource = new RecipeResource(resourceServiceMock);
    });
    
    describe("Get", () => {
        
        beforeEach(() => {
            recipeResource.get();
        });
        
        it("Calls get on the resource service", () => {
            expect(resourceServiceMock.get).toHaveBeenCalledWith('recipes');
        });
    });
    
    describe("Post", () => {
        
        var recipe = {name: "test"};
        
        beforeEach(() => {
            recipeResource.post(recipe);
        });
        
        it("Calls post on the resource service", () => {
            expect(resourceServiceMock.post).toHaveBeenCalled();
        });
        
        it("provides the recipe", () => {
            var data = resourceServiceMock.post.calls.mostRecent().args[1];
            
            expect(data).toEqual(recipe);
        });
    });
    
    describe("Put with saved recipe", () => {
        
        var recipe = {name: "test", _id: "bla"};
        
        beforeEach(() => {
            recipeResource.put(recipe);
        });
        
        it("Calls put on the resource service", () => {
            expect(resourceServiceMock.put).toHaveBeenCalled();
        });
        
        it("provides the stringified version of the recipe", () => {
            var data = resourceServiceMock.put.calls.mostRecent().args[1];
            
            expect(data).toEqual(recipe);
        });
    });

    describe("Put with unsaved recipe", () => {
        
        var recipe = {name: "test"};
        
        it("Throws error", () => {
            expect(() => {recipeResource.put(recipe);}).toThrowError("Cannot PUT a Recipe without valid Id");
        })
    });

    describe("Delete with a saved recipe", () => {
        
        var recipe = {name: "test", _id: "Bla"};
        
        beforeEach(() => {
            recipeResource.delete(recipe);
        });
        
        it("Calls delete on the resource service", () => {
            expect(resourceServiceMock.delete).toHaveBeenCalled();
        });
    });

    describe("Delete with an unsaved recipe", () => {
        
        var recipe = {name: "test"};
        
        it("Returns an empty object", () => {
            expect(recipeResource.delete(recipe)).toEqual({});
        });
    });
});
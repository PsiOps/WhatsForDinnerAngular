import {RecipeResource} from "./recipe.resource";

describe("Recipe Resource", () => {
    
    var mockObservable : any;
    var mockHttp : any;
    var recipeResource : RecipeResource;
    
    beforeEach(() => {
        
        mockObservable = {map: function(){}, json: function(){}};
        
        spyOn(mockObservable, 'map').and.returnValue(mockObservable);
        spyOn(mockObservable, 'json').and.returnValue(mockObservable);
        
        mockHttp = {get : function(url){}, 
                    post: function(url, data, headers){},
                    put: function(url, data, headers){},
                    delete: function(url, headers){}};
                    
        spyOn(mockHttp, 'get').and.returnValue(mockObservable);
        spyOn(mockHttp, 'post').and.returnValue(mockObservable);
        spyOn(mockHttp, 'put').and.returnValue(mockObservable);
        spyOn(mockHttp, 'delete').and.returnValue(mockObservable);
        
        recipeResource = new RecipeResource(mockHttp);
    });
    
    describe("Get", () => {
        
        beforeEach(() => {
            recipeResource.get();
        });
        
        it("Calls get on the http service", () => {
            expect(mockHttp.get).toHaveBeenCalled();
        });
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
        });
    });
    
    describe("Post", () => {
        
        var recipe = {name: "test"};
        
        beforeEach(() => {
            recipeResource.post(recipe);
        });
        
        it("Calls post on the http service", () => {
            expect(mockHttp.post).toHaveBeenCalled();
        });
        
        it("provides the stringified version of the recipe", () => {
            var data = mockHttp.post.calls.mostRecent().args[1];
            
            expect(data).toEqual(JSON.stringify(recipe));
        })
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
            
            expect(mockObservable.json.calls.count()).toEqual(1);
        });
    });
    
    describe("Put with saved recipe", () => {
        
        var recipe = {name: "test", _id: "bla"};
        
        beforeEach(() => {
            recipeResource.put(recipe);
        });
        
        it("Calls put on the http service", () => {
            expect(mockHttp.put).toHaveBeenCalled();
        });
        
        it("provides the stringified version of the recipe", () => {
            var data = mockHttp.put.calls.mostRecent().args[1];
            
            expect(data).toEqual(JSON.stringify(recipe));
        })
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
            
            expect(mockObservable.json.calls.count()).toEqual(1);
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
        
        it("Calls delete on the http service", () => {
            expect(mockHttp.delete).toHaveBeenCalled();
        });
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
            
            expect(mockObservable.json.calls.count()).toEqual(1);
        });
    });

    describe("Delete with an unsaved recipe", () => {
        
        var recipe = {name: "test"};
        
        it("Returns an empty object", () => {
            expect(recipeResource.delete(recipe)).toEqual({});
        });
    });
});
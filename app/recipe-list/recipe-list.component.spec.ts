import {RecipeListComponent} from './recipe-list.component';

describe("Recipe List", () => {
    
    var recipeListComponent : RecipeListComponent;
    var mockObservable;
    var mockResource;
    
    var mockRecipeFactory;
    var testRecipe = {name: "TestRecipe"};
    
    var recipeEventAggregator = {
        onRecipeMarkedForScheduling: function(){},
        onRecipeUpdated: function(){},
        onRecipeDeleted: function(){}
    };
    
    beforeEach(() => {
        
        mockResource = { get: function(){}, delete: function(){}, post: function(){}, put: function(){}};
        
        mockObservable = { subscribe : function(){}};
        
        spyOn(mockObservable, 'subscribe');
        
        spyOn(mockResource, 'get').and.returnValue(mockObservable);
        spyOn(mockResource, 'delete').and.returnValue(mockObservable);
        spyOn(mockResource, 'post').and.returnValue(mockObservable);
        spyOn(mockResource, 'put').and.returnValue(mockObservable);
        
        mockRecipeFactory = { create: function(){}};
        
        spyOn(mockRecipeFactory, 'create').and.returnValue(testRecipe);

        spyOn(recipeEventAggregator, 'onRecipeMarkedForScheduling');
        spyOn(recipeEventAggregator, 'onRecipeUpdated');
        spyOn(recipeEventAggregator, 'onRecipeDeleted');

        recipeListComponent = new RecipeListComponent(mockResource, mockRecipeFactory, recipeEventAggregator);
        
        recipeListComponent.ngOnInit();
    });
    
    it("Calls Get on the Resource", () => {
        expect(mockResource.get).toHaveBeenCalled();
    });
    
    it("Subscribes to the result", () => {
        expect(mockObservable.subscribe).toHaveBeenCalled();
    });
    
    it("Sets the local recipes on success", () => {
        
        var args = mockObservable.subscribe.calls.mostRecent().args;
        
        var onSucces = args[0];
        
        var recipes = [{test: "Test"}];
        
        onSucces(recipes);
        
        expect(recipeListComponent.recipes).toEqual(recipes);
    });
    
    describe("When the user adds a recipe", () => {
        
        beforeEach(() => {
            recipeListComponent.onAddButtonClicked();
        });
        
        it("Asks the RecipeFactory for a shiny new recipe", () => {
            expect(mockRecipeFactory.create).toHaveBeenCalled();
        });
        
        it("Adds the new recipe at the top of the list", () => {
            expect(recipeListComponent.recipes[0]).toEqual(testRecipe);
        });
        
        it("Sets the new recipe as the selected recipe", () => {
            expect(recipeListComponent.selectedRecipe).toEqual(testRecipe);
        });
        
        it("Shows the card for the new recipe", () => {
            expect(recipeListComponent.isCardVisible).toBe(true);
        });
    });
    
    describe("When the user selects a recipe", () => {
        
        beforeEach(() => {
            
            var args = mockObservable.subscribe.calls.mostRecent().args;
            
            var onSucces = args[0];
            
            var recipes = [testRecipe];
            
            onSucces(recipes);
        });
        
        it("does nothing if the card is showing", () => {
            recipeListComponent.isCardVisible = true;
            
            recipeListComponent.onSelect(testRecipe);
            
            expect(recipeListComponent.selectedRecipe).toBe(undefined);
        });
        
        it("sets the recipe as the selected recipe if the card is not showing", () => {
            recipeListComponent.isCardVisible = false;
            
            recipeListComponent.onSelect(testRecipe);
            
            expect(recipeListComponent.selectedRecipe).toBe(testRecipe);
        })
    });
    
    describe("When the user edits a recipe", () => {
        
        beforeEach(() => {
            
            recipeListComponent.onEditButtonClicked(testRecipe);
        });
        
        it("sets the selected recipe and card visibility", () => {
            
            expect(recipeListComponent.selectedRecipe).toEqual(testRecipe);
            
            expect(recipeListComponent.isCardVisible).toBe(true);
        });
    });
    
    describe("When the user deletes a recipe", () => {
        
        beforeEach(() => {
            
            recipeListComponent.onDeleteButtonClicked(testRecipe);
        });
        
        it("sets the selected recipe to undefined", () => {
            
            expect(recipeListComponent.selectedRecipe).toBe(undefined);
        });
        
        it("Calls delete on the resource", () => {
            
            expect(mockResource.delete).toHaveBeenCalled();
        });
        
        it("Refreshes the recipe list on succesfull delete", () => {
            
            var args = mockObservable.subscribe.calls.mostRecent().args;
        
            var onSucces = args[0];
         
            onSucces({});
            
            expect(mockResource.get.calls.count()).toEqual(2);
        });
        
        it("Communicates the deletion through the RecipeEventAggregator", () => {
            
            expect(recipeEventAggregator.onRecipeDeleted).toHaveBeenCalledWith(testRecipe);
        });
    });
    
    describe("When the user closes the recipe card", () => {
        
        beforeEach(() => {
            recipeListComponent.onFormClosed();
        });
        
        it("sets the card visibility to false", () => {
            expect(recipeListComponent.isCardVisible).toBe(false);
        });
    });
    
    describe("When the user submits a new recipe", () => {
        
        beforeEach(() => {
            
            recipeListComponent.selectedRecipe = testRecipe;
            
            recipeListComponent.onFormSubmit();
        });
        
        it("Calls post on the resource", () => {
            expect(mockResource.post).toHaveBeenCalled();
            });
            
        it("Updates the selectedRecipe's Id with the post result", () => {
            var args = mockObservable.subscribe.calls.mostRecent().args;
        
            var onSucces = args[0];
         
            var postedRecipe = {_id: "bla", name: "PostedTestRecipe"};
         
            onSucces(postedRecipe);
            
            expect(recipeListComponent.selectedRecipe._id).toEqual(postedRecipe._id);
        });
    });
    
    describe("When the user updates an existing recipe", () => {
        
        beforeEach(() => {
            var postedRecipe = {_id: "bla", name: "PostedTestRecipe"};
            
            recipeListComponent.selectedRecipe = postedRecipe;
            
            recipeListComponent.onFormSubmit();
        });
        
        it("Calls put on the resource", () => {
            expect(mockResource.put).toHaveBeenCalled();
        });
        
        it("Communicates the update through the RecipeEventAggregator", () => {
            
            expect(recipeEventAggregator.onRecipeUpdated).toHaveBeenCalledWith(recipeListComponent.selectedRecipe);
        });
    });
    
    describe("When the user marks a recipe for scheduling", () => {
       
       beforeEach(() => {
           
           recipeListComponent.onSchedule(testRecipe);
       });
       
        it("Communicates the scheduling through the RecipeEventAggregator", () => {
            
            expect(recipeEventAggregator.onRecipeMarkedForScheduling).toHaveBeenCalledWith(testRecipe);
        });
    });
});
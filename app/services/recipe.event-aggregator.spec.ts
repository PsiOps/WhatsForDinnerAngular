import {RecipeEventAggregator} from "./recipe.event-aggregator"

describe("RecipeEventAggregator", () => {
    
    var recipeEventAggregator : RecipeEventAggregator;
    var mockEventEmitterFactory : any;
    var mockEventEmitter : any;
    
    beforeEach(() => {
        
        mockEventEmitter = {emit : function(recipe){}};
        
        spyOn(mockEventEmitter, 'emit');
        
        mockEventEmitterFactory = {create: function(){}};
        
        spyOn(mockEventEmitterFactory, 'create').and.returnValue(mockEventEmitter);
        
        recipeEventAggregator = new RecipeEventAggregator(mockEventEmitterFactory);
    });
    
    it("Creates the eventEmitter", () => {
       expect(mockEventEmitterFactory.create.calls.count()).toBe(3); 
    });
    
    describe("When a recipe is marked for scheduling", () => {
        
        var testRecipe = {name : "Test"}
        
        beforeEach(() => {
            recipeEventAggregator.onRecipeMarkedForScheduling(testRecipe);
        });
        
        it("Emits an event signalling the recipe selection", () => {
            expect(mockEventEmitter.emit).toHaveBeenCalled();
            
            var emittedRecipe = mockEventEmitter.emit.calls.mostRecent().args[0];
            
            expect(emittedRecipe).toEqual(testRecipe);
        });
    });
    
    describe("When a recipe is updated", () => {
        
        var testRecipe = {name : "Test"}
        
        beforeEach(() => {
            recipeEventAggregator.onRecipeUpdated(testRecipe);
        });
        
        it("Emits an event signalling the recipe update", () => {
            expect(mockEventEmitter.emit).toHaveBeenCalled();
            
            var emittedRecipe = mockEventEmitter.emit.calls.mostRecent().args[0];
            
            expect(emittedRecipe).toEqual(testRecipe);
        });
    });
    
    describe("When a recipe is deleted", () => {
        
        var testRecipe = {name : "Test"}
        
        beforeEach(() => {
            recipeEventAggregator.onRecipeDeleted(testRecipe);
        });
        
        it("Emits an event signalling the recipe deletion", () => {
            expect(mockEventEmitter.emit).toHaveBeenCalled();
            
            var emittedRecipe = mockEventEmitter.emit.calls.mostRecent().args[0];
            
            expect(emittedRecipe).toEqual(testRecipe);
        });
    });
});
import {RecipeSelectionService} from "./recipe-selection.service"

describe("RecipeSelectionService", () => {
    
    var recipeSelectionService : RecipeSelectionService;
    var mockEventEmitterFactory : any;
    var mockEventEmitter : any;
    
    beforeEach(() => {
        
        mockEventEmitter = {emit : function(recipe){}};
        
        spyOn(mockEventEmitter, 'emit');
        
        mockEventEmitterFactory = {create: function(){}};
        
        spyOn(mockEventEmitterFactory, 'create').and.returnValue(mockEventEmitter);
        
        recipeSelectionService = new RecipeSelectionService(mockEventEmitterFactory);
    });
    
    it("Creates the eventEmitter", () => {
       expect(mockEventEmitterFactory.create).toHaveBeenCalled(); 
    });
    
    describe("When a recipe is selected for scheduling", () => {
        
        var testRecipe = {name : "Test"}
        
        beforeEach(() => {
            recipeSelectionService.scheduleRecipe(testRecipe);
        });
        
        it("Emits an event signalling the recipe selection", () => {
            expect(mockEventEmitter.emit).toHaveBeenCalled();
            
            var emittedRecipe = mockEventEmitter.emit.calls.mostRecent().args[0];
            
            expect(emittedRecipe).toEqual(testRecipe);
        });
    });
});
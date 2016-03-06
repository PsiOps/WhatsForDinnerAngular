import {RecipeFormComponent} from "./recipe-form.component";

describe("RecipeFormComponent", () => {
    
    var recipeFormComponent : any;
    var mockEventEmitterFactory : any;
    var mockEventEmitter : any;
    
    var rowFactory;
    
    beforeEach(() => {
        
        mockEventEmitter = {next: function(){}};
        
        spyOn(mockEventEmitter, 'next');
        
        mockEventEmitterFactory = {create : function(){}};
        
        spyOn(mockEventEmitterFactory, 'create').and.returnValue(mockEventEmitter);
        
        rowFactory = {create: function(value){}, createInsertRow: function(){}};
        
        spyOn(rowFactory, 'create').and.callFake((value) => return {isInsertRow: false, amount: value.amount, unit: value.unit, ingredient: value.ingredient.name, ingredientId: value.ingredient._id});
        
        spyOn(rowFactory, 'createInsertRow').and.callFake(() => {return {isInsertRow: true}});
        
        recipeFormComponent = new RecipeFormComponent(mockEventEmitterFactory, rowFactory);
    });
    
    it("creates eventemmitters", () => {
        expect(mockEventEmitterFactory.create.calls.count()).toEqual(2);
    });
    
    describe("when a recipe is set", () => {
        
        var testRecipe; 
        
        beforeEach(() => {
            
            testRecipe = {ingredients: [{_id: "bla", ingredient: {name: "IngrName"}}]};
            
            recipeFormComponent.recipe = testRecipe;
        });
        
        it("creates rows for each ingredient on the recipe", () => {
            
            expect(rowFactory.create.calls.count()).toBe(1);
            
            expect(rowFactory.create.calls.mostRecent().args[0]).toEqual(testRecipe.ingredients[0]);
        });
        
        it("adds the insert row", () => {
            
            expect(rowFactory.createInsertRow.calls.count()).toBe(1);
            
            expect(recipeFormComponent.ingredients.length).toBe(2);
            
            expect(recipeFormComponent.ingredients[1].isInsertRow).toBe(true);
        });
        
        describe("an ingredient is entered by way of the insert row", () => {

            beforeEach(() => {

                recipeFormComponent.onRowEdit(true);
            });
            
            it("sets the old insert row's isInsertRow property to false", () => {
                
                expect(recipeFormComponent.ingredients[1].isInsertRow).toBe(false);
            })
            
            it("adds a new insert row ingredient", () => {
               
                expect(recipeFormComponent.ingredients.length).toBe(3);
                
                expect(recipeFormComponent.ingredients[2].ingredient).toBe(undefined);
                expect(recipeFormComponent.ingredients[2].isInsertRow).toBe(true);
            });
        });
    });
    
    
    describe("as user closes the form", () => {
        
        beforeEach(() => {
            recipeFormComponent.onCloseButtonClicked();
        });
        
        it("it raises the close event", () => {
            expect(mockEventEmitter.next).toHaveBeenCalled();
        });
    });
    
    describe("as user submits the form", () => {
        
        var testRecipe;
        
        beforeEach(() => {
            
            testRecipe = {ingredients: [{_id: "bla", amount: 1, unit: "pc" ingredient: {name: "existing ingredient", _id: "testId"}}]};
            
            recipeFormComponent.recipe = testRecipe;
            
            recipeFormComponent.onRowEdit(true);
            
            expect(recipeFormComponent.ingredients.length).toBe(3);
            
            expect(recipeFormComponent.ingredients[0].isInsertRow).toBe(false);
            expect(recipeFormComponent.ingredients[1].isInsertRow).toBe(false);
            expect(recipeFormComponent.ingredients[2].isInsertRow).toBe(true);
            
            recipeFormComponent.ingredients[1].ingredient = "new ingredient";
            recipeFormComponent.ingredients[1].ingredientId = null;
            
            recipeFormComponent.onSubmitButtonClicked();
        });
        
        it("sets the recipe's ingredients with the component's ingredients minus the dummy", () => {
            
            expect(testRecipe.ingredients.length).toBe(2);
            expect(testRecipe.ingredients[0].ingredient).toEqual({_id: "testId", name: "existing ingredient"});
            expect(testRecipe.ingredients[1].ingredient).toEqual({_id: null, name: "new ingredient"});
        });
        
        it("raises the submit event", () => {
            expect(mockEventEmitter.next).toHaveBeenCalled();
        })
    });
});
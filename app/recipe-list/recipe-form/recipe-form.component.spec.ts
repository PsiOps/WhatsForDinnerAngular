import {RecipeFormComponent} from "./recipe-form.component";

describe("RecipeFormComponent", () => {
    
    var recipeFormComponent : any;
    var mockEventEmitterFactory : any;
    var mockEventEmitter : any;
    
    beforeEach(() => {
        
        mockEventEmitter = {next: function(){}};
        
        spyOn(mockEventEmitter, 'next');
        
        mockEventEmitterFactory = {create : function(){}};
        
        spyOn(mockEventEmitterFactory, 'create').and.returnValue(mockEventEmitter);
        
        recipeFormComponent = new RecipeFormComponent(mockEventEmitterFactory);
    });
    
    it("creates eventemmitters", () => {
        expect(mockEventEmitterFactory.create.calls.count()).toEqual(2);
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
        
        beforeEach(() => {
            recipeFormComponent.onSubmitButtonClicked();
        });
        
        it("raises the submit event", () => {
            expect(mockEventEmitter.next).toHaveBeenCalled();
        })
    });
});
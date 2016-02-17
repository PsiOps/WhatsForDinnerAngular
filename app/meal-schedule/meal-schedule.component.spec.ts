import {MealScheduleComponent} from './meal-schedule.component';

describe("MealScheduleComponent", () => {
   
   var mealScheduleComponent;
   
   var mealScheduleResourceMock = {
      get: function(){},
      post: function(){},
      put: function(){},
      delete: function(){}
   };
   
   var eventEmitterMock = {
     subscribe: function(){} 
   };
   
   var recipeSelectionServiceMock = {
      recipeSelected: eventEmitterMock;
   };
   
   beforeEach(() => {
      
      spyOn(mealScheduleResourceMock, 'get');
      spyOn(mealScheduleResourceMock, 'post');
      spyOn(mealScheduleResourceMock, 'put');
      spyOn(mealScheduleResourceMock, 'delete');
      
      spyOn(eventEmitterMock, 'subscribe');
      
      mealScheduleComponent = new MealScheduleComponent(mealScheduleResourceMock, recipeSelectionServiceMock);
      
      mealScheduleComponent.ngOnInit();
   });
   
   it("calls the schedule resource for the current schedule", () => {
      
      expect(mealScheduleResourceMock.get).toHaveBeenCalled();
      
      //TODO: Check the default date/moment parameters for the initial get
   });
   
   it("registers to recipe selection events", () => {
      
      expect(eventEmitterMock.subscribe).toHaveBeenCalled();
   });
   
   describe("as the schedule data completes downloading", () => {
      
      it("selects the first unscheduled day that is not in the past", () => {
         
         // The first day is already scheduled and should not be selected
         
         // The next day is unscheduled and should be selected
      });

   });
   
   describe("as a different day is selected as schedule target", () => {
       
       it("updates the selected day", () => {
          // The third day is now selected, which incidentally is followed by a scheduled day
       });
   });
   
   describe("as a recipe is selected for scheduling", () => {
       
       it("it updates the schedule day recipe id");
       
       it("it puts the updated schedule day to the resource");
       
       it("it informs the ShoppingListService");
       
       it("selects the next unscheduled day in the future", () => {
          // the very next day is already scheduled with a recipe,
          // so the free day after that should be selected
       })
   });
   
   describe("as a schedule target in the past is selected", () => {
      
      it("does not update the selected day");
   });
   
   describe("as a recipe is unscheduled", () => {
       
       it("it updates the schedule day recipe id");
       
       it("it puts the updated schedule day to the resource");
   
       it("it informs the ShoppingListService");
   });
   
   describe("as a recipe is updated succesfully", () => {
       
       it("any days with this recipe scheduled update their recipe data");
   });
   
   describe("as a recipe is deleted succesfully", () => {
       
       it("any days with this recipe revert back to being unscheduled");
   });
});
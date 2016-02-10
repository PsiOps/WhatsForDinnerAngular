describe("MealScheduleComponent", () => {
   
   it("calls the schedule resource for the current schedule");
   
   it("registers to recipe selection events");
   
   it("assigns the default selected day")
   
   describe("as a different day is selected as schedule target", () => {
       
       it("updates the selected day");
   });
   
   describe("as a recipe is selected for scheduling", () => {
       
       it("it updates the schedule day recipe id");
       
       it("it puts the updated schedule day to the resource");
       
       it("it informs the ShoppingListService");
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
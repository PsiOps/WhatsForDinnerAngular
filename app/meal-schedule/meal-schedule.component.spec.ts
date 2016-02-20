import {MealScheduleComponent} from './meal-schedule.component';

describe("MealScheduleComponent", () => {
   
   var mealScheduleComponent;
   
   var mealScheduleResourceMock;
   
   var getResultObservable;
   
   var recipeSelectedEvent;
   var recipeUpdatedEvent;
   var recipeDeletedEvent;
   
   var recipeEventAggregator;
   
   beforeEach(() => {
      
      mealScheduleResourceMock = {
         get: function(){},
         post: function(){},
         put: function(){},
         delete: function(){}
      };
      
      getResultObservable = {subscribe: function(){}};
      
      spyOn(getResultObservable, 'subscribe');
   
      spyOn(mealScheduleResourceMock, 'get').and.returnValue(getResultObservable);
      spyOn(mealScheduleResourceMock, 'post');
      spyOn(mealScheduleResourceMock, 'put');
      spyOn(mealScheduleResourceMock, 'delete');
      
      recipeSelectedEvent = {subscribe: function(){}};
      recipeUpdatedEvent = {subscribe: function(){}};
      recipeDeletedEvent = {subscribe: function(){}};
      
      recipeEventAggregator = {
         recipeMarkedForScheduling: recipeSelectedEvent,
         recipeUpdated: recipeUpdatedEvent,
         recipeDeleted: recipeDeletedEvent,
      };
      
      spyOn(recipeSelectedEvent, 'subscribe');
      spyOn(recipeUpdatedEvent, 'subscribe');
      spyOn(recipeDeletedEvent, 'subscribe');
      
      mealScheduleComponent = new MealScheduleComponent(mealScheduleResourceMock, recipeEventAggregator);
      
      mealScheduleComponent.ngOnInit();
   });
   
   it("calls the schedule resource for the current schedule", () => {
      
      expect(mealScheduleResourceMock.get).toHaveBeenCalled();
      
      //TODO: Check the default date/moment parameters for the initial get
   });
   
   it("registers to recipe events", () => {
      
      expect(recipeSelectedEvent.subscribe).toHaveBeenCalled();
      expect(recipeUpdatedEvent.subscribe).toHaveBeenCalled();
      expect(recipeDeletedEvent.subscribe).toHaveBeenCalled();
   });
   
   describe("as the schedule data completes downloading", () => {
      
      var today = new moment();
      
      var data;
      
      var onDataDownloaded;
      
      beforeEach(() => {
         
         data = [
         { day: today.add(-1, 'day').toDate() },
         { day: today.toDate(), recipeId: "Scheduled", recipe: {Name: "Test"}},
         { day: today.add(1, 'day').toDate() },
         { day: today.add(2, 'day').toDate() },
         { day: today.add(3, 'day').toDate(), recipeId: "Scheduled", recipe: {Name: "Test"}},
         { day: today.add(4, 'day').toDate() }
         ];
         
         onDataDownloaded = getResultObservable.subscribe.calls.mostRecent().args[0];
         
         onDataDownloaded(data);
      });
      
      it("selects the first unscheduled day that is not in the past", () => {
         
         // The next day is unscheduled and should be selected
         // The first day is already scheduled and should not be selected
         expect(mealScheduleComponent.selectedDay).toEqual(data[2]);
      });

      describe("as a different day is selected as schedule target", () => {
       
         beforeEach(() => {
          
            mealScheduleComponent.onSelect(data[3]);
         });
         
         it("updates the selected day", () => {
            // The third day is now selected, which incidentally is followed by a scheduled day
            expect(mealScheduleComponent.selectedDay).toEqual(data[3]);
         });
      });
   
      describe("as a recipe is selected for scheduling", () => {
          
          var testRecipe = {_id: "testRecipeId"};
          
          beforeEach(() => {
             
             mealScheduleComponent.onSelect(data[3]);     
            
             var onRecipeScheduled = recipeSelectedEvent.subscribe.calls.mostRecent().args[0];
             
             onRecipeScheduled(testRecipe);
          });
          
          it("it updates the schedule day recipe id", () => {
             expect(data[3].recipeId).toBe(testRecipe._id)
          });
          
          it("it posts the updated schedule day to the resource", () => {
             
             expect(mealScheduleResourceMock.post).toHaveBeenCalled();
          });
          
          it("it informs the ShoppingListService");
          
          it("selects the next unscheduled day in the future", () => {
             // the very next day is already scheduled with a recipe,
             // so the free day after that should be selected
             expect(mealScheduleComponent.selectedDay).toEqual(data[5]);
          })
      });
      
      describe("as a schedule target in the past is selected", () => {
         
         beforeEach(() =>{
            mealScheduleComponent.onSelect(data[3]);
            mealScheduleComponent.onSelect(data[0]);
         });
         
         it("does not update the selected day", () =>{
            expect(mealScheduleComponent.selectedDay).toEqual(data[3]);
         });
      });
      
      describe("as an already scheduled recipe is replaced", () => {
         
         var testRecipe = {_id: "testRecipeId"};

         beforeEach(() =>{
            mealScheduleComponent.onSelect(data[1]);
            
            var onRecipeScheduled = recipeSelectedEvent.subscribe.calls.mostRecent().args[0];
             
             onRecipeScheduled(testRecipe);
         });
         
         it("it updates the schedule day recipe id", () => {
            
            expect(data[1].recipeId).toBe(testRecipe._id)
         });
         
         it("puts the updated schedule day to the resource", () =>{
            
            expect(mealScheduleResourceMock.put).toHaveBeenCalledWith(data[1]);
         });
         
         it("selects the next unscheduled day in the future", () => {
            
             expect(mealScheduleComponent.selectedDay).toEqual(data[2]);
          });
      });
      
      describe("as a recipe is unscheduled", () => {
          
          beforeEach(() => {
             
               mealScheduleComponent.onSelect(data[1]);

               mealScheduleComponent.onClear(data[1]);
          });
          
          it("it updates the schedule day recipe id", () =>{
             
             expect(mealScheduleComponent.selectedDay.recipeId).toBeNull();
             expect(mealScheduleComponent.selectedDay.recipe).toBeNull();
          });
          
          it("it deletes the schedule day from the resource", () => {
             
             expect(mealScheduleResourceMock.delete).toHaveBeenCalledWith(data[1]);
          });
      
          it("it informs the ShoppingListService");
      });
      
      describe("as a recipe is updated succesfully", () => {
          
          var updatedRecipe = {_id: "Scheduled", name: "Updated"};
          
          beforeEach(() => {
             
             var onRecipeUpdated = recipeUpdatedEvent.subscribe.calls.mostRecent().args[0];
             
             onRecipeUpdated(updatedRecipe);
          });
          
          it("any days with this recipe scheduled update their recipe data", () => {
             
             expect(data[1].recipe.name).toBe("Updated");
             expect(data[4].recipe.name).toBe("Updated");
          });
      });
      
      describe("as a recipe is deleted succesfully", () => {
          
          var deletedRecipe = {_id: "Scheduled"};

          beforeEach(() => {
             
             var onRecipeDeleted = recipeDeletedEvent.subscribe.calls.mostRecent().args[0];
             
             onRecipeDeleted(deletedRecipe);
          });
          
          it("any days with this recipe revert back to being unscheduled", () =>{
             
             expect(data[1].recipe).toBeNull();
             expect(data[1].recipeId).toBeNull();
             expect(data[4].recipe).toBeNull();
             expect(data[4].recipeId).toBeNull();
          });
      });
   });
});
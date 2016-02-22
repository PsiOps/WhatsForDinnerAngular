import {ScheduleDayResource} from './schedule-day.resource';

describe("ScheduleDayResource", () => {
    
    var scheduleDayResource : ScheduleDayResource;
    
    var resourceServiceMock : any = {
        get: function(){},
        put: function(){},
        post: function(){},
        delete: function(){}
    };
    
    var observable = {map: function(){}};
    
    beforeEach(() => {
        
        spyOn(resourceServiceMock, 'get').and.returnValue(observable);
        spyOn(resourceServiceMock, 'post').and.returnValue(observable);
        spyOn(resourceServiceMock, 'put').and.returnValue(observable);
        spyOn(resourceServiceMock, 'delete').and.returnValue(observable);
        
        scheduleDayResource = new ScheduleDayResource(resourceServiceMock);
    });
    
    describe("Get with date parameters", () => {
        
        var from = new Date(2015, 1, 20);
        var upTo = new Date(2015, 1 , 28);
        
        beforeEach(() => {
            
            scheduleDayResource.get(from, upTo);
        });
        
        it("calls resourceservice with queried resourcelocation", () => {
            
            var location = `scheduledays?from=${from.getTime()}&upto=${upTo.getTime()}`;
            
            console.log(location);
            
            expect(resourceServiceMock.get).toHaveBeenCalledWith(location);
        })
    });
    
    describe("Put", () => {
        
        var scheduleDay = {_id: "TestId", day: new Date()};
        
        beforeEach(() => {
            
            scheduleDayResource.put(scheduleDay);
        });
        
        it("Calls put on the resource service", () => {
            expect(resourceServiceMock.put).toHaveBeenCalled();
        });
    });
    
    describe("Delete", () => {
        
        var scheduleDay = {_id: "TestId", day: new Date()};
        
        beforeEach(() => {
            
            scheduleDayResource.delete(scheduleDay);
        });
        
        it("Calls delete on the resource service", () => {
            expect(resourceServiceMock.delete).toHaveBeenCalled();
        });
    });
});
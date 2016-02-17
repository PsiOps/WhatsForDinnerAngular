import {ScheduleDayResource} from './schedule-day.resource';

describe("ScheduleDayResource", () => {
    
    var scheduleDayResource : ScheduleDayResource;
    
    var resourceServiceMock : any = {
        get: function(){},
        put: function(){},
        post: function(){},
        delete: function(){}
    };
    
    beforeEach(() => {
        
        spyOn(resourceServiceMock, 'get');
        spyOn(resourceServiceMock, 'post');
        spyOn(resourceServiceMock, 'put');
        spyOn(resourceServiceMock, 'delete');
        
        scheduleDayResource = new ScheduleDayResource(resourceServiceMock);
    });
    
    describe("Get", () => {
        
        beforeEach(() => {
            scheduleDayResource.get();
        });
        
        it("Calls get on the resource service", () => {
            expect(resourceServiceMock.get).toHaveBeenCalled();
        });
    });
    
    describe("Get with date parameters", () => {
        
        var from = new Date(2015, 1, 20).toString();
        var upTo = new Date(2015, 1 , 28).toString();
        
        beforeEach(() => {
            
            scheduleDayResource.get(from, upTo);
        });
        
        it("calls resourceservice with queried resourcelocation", () => {
            
            var location = `scheduledays?from=${from}&upto=${upTo}`;
            
            console.log(location);
            
            expect(resourceServiceMock.get).toHaveBeenCalledWith(location);
        })
    });
    
    describe("Post", () => {
        
        var scheduleDay = {};
        
        beforeEach(() => {
            
            scheduleDayResource.post(scheduleDay);
        });
        
        it("Calls post on the resource service", () => {
            expect(resourceServiceMock.post).toHaveBeenCalled();
        });
    });
    
    describe("Put", () => {
        
        var scheduleDay = {_id: "TestId"};
        
        beforeEach(() => {
            
            scheduleDayResource.put(scheduleDay);
        });
        
        it("Calls put on the resource service", () => {
            expect(resourceServiceMock.put).toHaveBeenCalled();
        });
    });
    
    describe("Delete", () => {
        
        var scheduleDay = {_id: "TestId"};
        
        beforeEach(() => {
            
            scheduleDayResource.delete(scheduleDay);
        });
        
        it("Calls delete on the resource service", () => {
            expect(resourceServiceMock.delete).toHaveBeenCalled();
        });
    });
});
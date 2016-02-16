import {ResourceService} from "./resource.service";

describe("Resource Service", () => {
   
    var mockObservable : any;
    var mockHttp : any;
    var headerFactoryMock : any = {create : function(){}};
    var mockAppConfig : any;
    
    var resourceService : ResourceService;

    beforeEach(() => {
        
        mockObservable = {map: function(){}, json: function(){}};
        
        spyOn(mockObservable, 'map').and.returnValue(mockObservable);
        spyOn(mockObservable, 'json').and.returnValue(mockObservable);
        
        mockHttp = {get : function(url){}, 
                    post: function(url, data, headers){},
                    put: function(url, data, headers){},
                    delete: function(url, headers){}};
               
        mockAppConfig = {baseUrl: "test"};
             
        spyOn(mockHttp, 'get').and.returnValue(mockObservable);
        spyOn(mockHttp, 'post').and.returnValue(mockObservable);
        spyOn(mockHttp, 'put').and.returnValue(mockObservable);
        spyOn(mockHttp, 'delete').and.returnValue(mockObservable);

        resourceService = new ResourceService(mockHttp, headerFactoryMock, mockAppConfig);
    });
    
    describe("Get", () => {
        
        beforeEach(() => {
            resourceService.get('recipes');
        });
        
        it("Calls get on the http service", () => {
            expect(mockHttp.get).toHaveBeenCalledWith(mockAppConfig.baseUrl + 'recipes');
        });
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
        });
});
    describe("Post", () => {
        
        var recipe = {name: "test"};
        
        beforeEach(() => {
            resourceService.post('recipes', recipe);
        });
        
        it("Calls post on the http service", () => {
            expect(mockHttp.post).toHaveBeenCalled();
        });
        
        it("provides the stringified version of the recipe", () => {
            var data = mockHttp.post.calls.mostRecent().args[1];
            
            expect(data).toEqual(JSON.stringify(recipe));
        })
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
            
            expect(mockObservable.json.calls.count()).toEqual(1);
        });
    });
    describe("Put", () => {
        
        var recipe = {name: "test", _id: "bla"};
        
        beforeEach(() => {
            resourceService.put('test', recipe);
        });
        
        it("Calls put on the http service", () => {
            expect(mockHttp.put).toHaveBeenCalled();
        });
        
        it("provides the stringified version of the recipe", () => {
            var data = mockHttp.put.calls.mostRecent().args[1];
            
            expect(data).toEqual(JSON.stringify(recipe));
        })
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
            
            expect(mockObservable.json.calls.count()).toEqual(1);
        });
    });
    describe("Delete", () => {
        
        var recipe = {name: "test", _id: "Bla"};
        
        beforeEach(() => {
            resourceService.delete(recipe);
        });
        
        it("Calls delete on the http service", () => {
            expect(mockHttp.delete).toHaveBeenCalled();
        });
        
        it("casts the response to json format", () => {
            expect(mockObservable.map).toHaveBeenCalled();
            
            var onMap = mockObservable.map.calls.mostRecent().args[0];
            
            onMap(mockObservable);
            
            expect(mockObservable.json).toHaveBeenCalled();
            
            expect(mockObservable.json.calls.count()).toEqual(1);
        });
    });
});
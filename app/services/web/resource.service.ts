import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {HeaderFactory} from '../../factories/header.factory'
import {AppConfig} from '../../app.config';

@Injectable()

export class ResourceService {
    
    private _baseUrl : String;
    
    constructor(
        private http: Http, 
        private headerFactory: HeaderFactory, 
        appConfig: AppConfig){
        
        _baseUrl = appConfig.baseUrl;
    }
    
    public get(resource: string): any {
        
        return this.http.get(_baseUrl + resource)
            .map(res => res.json());
    }
    
    public post(resource: string, data: any) : any {

        return this.http.post(_baseUrl + resource, JSON.stringify(data), {headers:this.headerFactory.create()})
            .map(res => res.json());
    }
    
    public put(resource: string, data: any) : any {
        
        return this.http.put(_baseUrl + resource, JSON.stringify(data), {headers:this.headerFactory.create()})
            .map(res => res.json());
    }
    
    public delete(resource: string) : any {
        
        return this.http.delete(_baseUrl + resource, {headers:this.headerFactory.create()})
            .map(res => res.json());
    }
}
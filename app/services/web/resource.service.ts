import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {HeaderFactory} from '../../factories/header.factory'
import {AppConfig} from '../../app.config';

@Injectable()

export class ResourceService {
    
    private baseUrl : String;
    
    constructor(
        private http: Http, 
        private headerFactory: HeaderFactory, 
        appConfig: AppConfig){
        
        this.baseUrl = appConfig.baseUrl;
    }
    
    public get(resource: string): any {
        
        return this.http.get(this.baseUrl + resource)
            .map(res => res.json());
    }
    
    public post(resource: string, data: any) : any {

        return this.http.post(this.baseUrl + resource, JSON.stringify(data), {headers:this.headerFactory.create()})
            .map(res => res.json());
    }
    
    public put(resource: string, data: any) : any {
        
        return this.http.put(this.baseUrl + resource, JSON.stringify(data), {headers:this.headerFactory.create()})
            .map(res => res.json());
    }
    
    public delete(resource: string) : any {
        
        return this.http.delete(this.baseUrl + resource, {headers:this.headerFactory.create()})
            .map(res => res.json());
    }
}
import {Injectable} from 'angular2/core';
import {Headers} from 'angular2/http';

@Injectable()

export class HeaderFactory{
    
    public create() : Headers {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
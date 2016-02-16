import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()

export class EventEmitterFactory {
    public create() : EventEmitter {
        return new EventEmitter();
    }
}
import {Component} from 'angular2/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {MealScheduleComponent} from './meal-schedule/meal-schedule.component';
import {RecipeResource} from './services/web/recipe.resource';
import {ScheduleDayResource} from './services/web/schedule-day.resource';
import {ResourceService} from './services/web/resource.service';
import {RecipeEventAggregator} from './services/recipe.event-aggregator';
import {EventEmitterFactory} from './factories/event-emitter.factory';
import {HeaderFactory} from './factories/header.factory';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppConfig} from './app.config';

@Component({
    selector: 'wfd-app',
    providers: [ResourceService,
                RecipeResource, 
                ScheduleDayResource,
                RecipeEventAggregator, 
                EventEmitterFactory, 
                HTTP_PROVIDERS, 
                AppConfig,
                HeaderFactory],
    directives: [RecipeListComponent, MealScheduleComponent],
    templateUrl: 'app/app.component.html'
})

export class AppComponent { }
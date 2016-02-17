import {Recipe} from ' ./Recipe';

export class ScheduleDay{
    _id: string;
    day: Date;
    recipeId: string;
    recipe: Recipe;
}
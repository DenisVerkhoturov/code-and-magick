import { Direction } from './constants';

export default class Fireball
{
    constructor() {}

    move() {
    }

    behave(object, state, timeframe) {
        if (object.direction & Direction.LEFT)
            object.x -= object.speed * timeframe;

        if (object.direction & Direction.RIGHT)
            object.x += object.speed * timeframe;
    }
}

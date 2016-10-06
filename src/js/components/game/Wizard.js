import { Direction } from './constants';

const HEIGHT = 300, WIDTH = 700;

export default class Wizard
{
    constructor() {}

    move() {
    }

    behave(object, state, timeframe) {
        if (state.keysPressed.UP && object.y > 0) {
            object.direction = object.direction & ~Direction.DOWN;
            object.direction = object.direction | Direction.UP;
            object.y -= object.speed * timeframe * 2;

            if (object.y < 0)
                object.y = 0;
        }

        if (!state.keysPressed.UP)
            if (object.y < HEIGHT - object.height) {
                object.direction = object.direction & ~Direction.UP;
                object.direction = object.direction | Direction.DOWN;
                object.y += object.speed * timeframe / 3;
            }
            else
                object.Direction = object.direction & ~Direction.DOWN;

        if (state.keysPressed.LEFT) {
            object.direction = object.direction & ~Direction.RIGHT;
            object.direction = object.direction | Direction.LEFT;
            object.x -= object.speed * timeframe;
        }

        if (state.keysPressed.RIGHT) {
            object.direction = object.direction & ~Direction.LEFT;
            object.direction = object.direction | Direction.RIGHT;
            object.x += object.speed * timeframe;
        }

        if (object.y < 0) {
            object.y = 0;
            object.Direction = object.direction & ~Direction.DOWN;
            object.Direction = object.direction & ~Direction.UP;
        }

        if (object.y > HEIGHT - object.height) {
            object.y = HEIGHT - object.height;
            object.Direction = object.direction & ~Direction.DOWN;
            object.Direction = object.direction & ~Direction.UP;
        }

        if (object.x < 0) object.x = 0;

        if (object.x > WIDTH - object.width)
            object.x = WIDTH - object.width;
    }
}

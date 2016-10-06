/**
 * Коды направлений.
 * @enum {number}
 */
export const DIRECTION = {
    NULL: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 4,
    DOWN: 8
};

/**
 * ID возможных ответов функций, проверяющих успех прохождения уровня.
 * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
 * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
 * нужно прервать.
 * @enum {number}
 */
export const VERDICT = {
    'CONTINUE': 0,
    'WIN': 1,
    'FAIL': 2,
    'PAUSE': 3,
    'INTRO': 4
};

/**
 * ID уровней.
 * @enum {number}
 */
export const Level = {
    'INTRO': 0,
    'MOVE_LEFT': 1,
    'MOVE_RIGHT': 2,
    'LEVITATE': 3,
    'HIT_THE_MARK': 4
};

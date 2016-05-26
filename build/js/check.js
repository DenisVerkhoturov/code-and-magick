'use strict';

function getMessage(a, b)
{
    var message;

    if (typeof a == 'boolean') {
        if (a) {
            message = 'Я попал в ' + b
        } else {
            message = 'Я никуда не попал';
        }
    }
    else if (typeof a == 'number') {
        message = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }
    else if (typeof a == 'object') {
        if (typeof b == 'object') {
            let length = a.reduce((result, current, index) => result + (current * b[index]));
            message = 'Я прошёл ' + length + ' метров';
        } else {
            let sum = a.reduce((result, current) => result + current);
            message = 'Я прошёл ' + sum + ' шагов';
        }
    }

    return message;
}

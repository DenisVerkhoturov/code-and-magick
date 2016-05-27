'use strict';

/**
 * Возвращает строку сообщения, сформированную в зависимости от типов переданных значений.
 * @param a {boolean||Boolean||number||Number||Array}
 * @param b {string||number||Number||Array}
 * @returns {string}
 * @throws {Error} Если переданны параметры, с которыми функция не работает.
 */
function getMessage(a, b)
{
    var message;

    if (_assert(a, 'Boolean')) {
        if (a.valueOf()) {
            message = 'Я попал в ' + b;
        } else {
            message = 'Я никуда не попал';
        }
    }
    else if (_assert(a, 'Number')) {
        message = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }
    else if (_assert(a, 'Array')) {
        if (_assert(b, 'Array')) {
            var length = a.reduce(function(result, current, index) {
                return result + current * (b[index] || 0);
            }, 0);
            message = 'Я прошёл ' + length + ' метров';
        } else {
            var sum = a.reduce(function(result, current) {
                return result + current;
            }, 0);
            message = 'Я прошёл ' + sum + ' шагов';
        }
    } else {
        throw new Error('Функция не работает с переданными параметрами: a: {' + a + '}, b: {' + b + '}');
    }

    return message;
}

/**
 * Проверка соответствия типов данных.
 * @param value - значение тип, которого необходимо проверить.
 * @param expectedType - тип, c которым соотносим переданное значение.
 * @returns {boolean}
 * @private
 */
function _assert(value, expectedType)
{
    return Object.prototype.toString.call(value).slice(8, -1) == expectedType;
}

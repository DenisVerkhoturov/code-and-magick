'use strict';

/**
 * Возвращает строку сообщения, сформированную в зависимости от типов переданных значений.
 * @param a {boolean||Boolean||number||Number||Array}
 * @param b {string||number||Number||Array}
 * @returns {string}
 */
function getMessage(a, b) {
    var message;

    if (_.variable(a).ofType('Boolean')) {
        if (a.valueOf()) {
            message = 'Я попал в ' + b;
        } else {
            message = 'Я никуда не попал';
        }
    }
    else if (_.variable(a).ofType('Number')) {
        message = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
    }
    else if (_.variable(a).ofType('Array')) {
        if (_.variable(b).ofType('Array')) {
            var length = a.reduce(function (result, current, index) {
                return result + current * (b[index] || 0);
            }, 0);
            message = 'Я прошёл ' + length + ' метров';
        } else {
            var sum = a.reduce(function (result, current) {
                return result + current;
            }, 0);
            message = 'Я прошёл ' + sum + ' шагов';
        }
    } else {
        message = '';
    }

    return message;
}

/**
 * Объект вспомогательных функций, будет расширяться по мере необходимости.
 */
var _ = {
    /**
     * Установиливает значение в текущий контекст.
     * @param variable
     * @memberOf {_}
     * @returns {_}
     */
    variable: function (variable) {
        this.context = variable;
        return this;
    },

    /**
     * Проверяет, является ли текущее значение контекста ожидаемого типа.
     * @param expectedType
     * @memberOf {_}
     * @returns {boolean}
     */
    ofType: function (expectedType) {
        return Object.prototype.toString.call(this.context).slice(8, -1) == expectedType;
    }
};

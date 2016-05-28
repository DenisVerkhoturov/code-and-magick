'use strict';

/**
 * Возвращает строку сообщения, сформированную в зависимости от типов переданных значений.
 * @param a {boolean||Boolean||number||Number||Array}
 * @param b {string||number||Number||Array}
 * @returns {string}
 */
function getMessage(a, b) {
  var message;

  if (typeof a === 'boolean') {
    if (a.valueOf()) {
      message = 'Я попал в ' + b;
    } else {
      message = 'Я никуда не попал';
    }
  } else if (typeof a === 'number') {
    message = 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  } else if (Array.isArray(a)) {
    if (Array.isArray(b)) {
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

'use strict';

define('utilities', function() {
  return {
    /**
     * @param {string} url
     * @param {function(Array.<Object>)} resolve
     * @param {function(Array.<Object>)} [reject]
     * @param {function()} [process]
     */
    ajax: function(url, resolve, reject, process) {
      var xhr = new XMLHttpRequest();

      xhr.timeout = process;
      xhr.onerror = reject;

      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          xhr.onerror();
        }
      };

      xhr.open('GET', url).send();
    },
    /**
     * @param {function} callback
     * @param {number} delay
     * @param {*} [thisArg]
     * @returns {function}
     */
    throttle: function(callback, delay, thisArg) {
      var isCallNeeded = true;
      return function() {
        if (isCallNeeded) {
          isCallNeeded = false;
          callback.apply(thisArg, arguments);
          setTimeout(function() {
            isCallNeeded = true;
          }, delay);
        }
      };
    }
  };
});

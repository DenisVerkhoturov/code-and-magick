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
      console.log(url);
      var xhr = new XMLHttpRequest();

      xhr.timeout = process;
      xhr.onerror = reject;

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          xhr.onerror();
        }
      };

      xhr.open('GET', url);
      xhr.send();
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
    },
    /**
     * @param {Element|string} template
     * @param {string} selector
     * @returns {Node}
     */
    getElement: function(template, selector) {
      var element;

      if (typeof template === 'string') {
        template = document.querySelector(template);
      }

      if ('content' in template) {
        element = template.content.querySelector(selector);
      } else {
        element = template.querySelector(selector);
      }

      return element.cloneNode(true);
    }
  };
});

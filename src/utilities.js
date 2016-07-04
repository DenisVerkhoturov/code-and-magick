'use strict';

/**
 * @callback filterCallback
 * @param {Array} array
 * @returns {Array}
 */

/**
 * @callback constructor
 * @param {Object} object
 * @return {Object}
 */

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
    },

    /**
     * @param {Element} element
     * @param {string} text
     * @constructor
     */
    Message: function(element, text) {
      this.element = element;
      this.element.textContent = text;

      this.render = function() {
        return this.element;
      };

      this.remove = function() {
        this.element.parentNode.removeChild(this.element);
      };
    },

    /**
     * @param {Element} element
     * @param {filterCallback} callback
     * @constructor
     */
    Filter: function(element, callback) {
      this.element = element;
      /**
       * @param {Array}
       * @returns {Array}
       */
      this.filter = callback;
    },

    /**
     * @param {Element} element
     * @param {Array.<Filter>} filters
     * @param {number} [currentIndex = 0]
     * @constructor
     */
    Filters: function(element, filters, currentIndex) {
      currentIndex = typeof currentIndex === 'undefined' ? 0 : currentIndex;

      this.element = element;
      this.filters = filters;
      /** @type {function(Filter, Array)} */
      this.onchange = 'undefined';

      var _current = filters[currentIndex];

      Object.defineProperty(this, 'current', {
        set: function(value) {
          _current = value;
          if (typeof this.onchange === 'function') {
            this.onchange(_current.element, _current.filter);
          }
        },
        get: function() {
          return _current;
        }
      });

      /**
       * @param {Event} evt
       */
      this.handler = function(evt) {
        var index = this.filters.map(function(filter) {
          return filter.element;
        }).indexOf(evt.target);

        if (index !== -1) {
          this.current = this.filters[index];
        }
      };

      this.handler = this.handler.bind(this);
      this.element.addEventListener('click', this.handler);
    },

    /**
     * @param {Element} element
     * @param {Element} moreBtn
     * @param {Array.<Object>} objects
     * @param {constructor} constructor
     * @param {number} objectsPerPage
     * @constructor
     */
    PaginatedList: function(element, moreBtn, objects, constructor, objectsPerPage) {
      this.element = element;
      this.more = moreBtn;
      this.page = 0;
      this.objectsPerPage = objectsPerPage;
      /** @type {function()} */
      this.onempty = 'undefined';

      var _list = objects,
        renderedObjects = [];

      Object.defineProperty(this, 'isPageLast', {
        get: function() {
          return this.page >= Math.floor(this.objects.length / this.objectsPerPage);
        }
      });

      Object.defineProperty(this, 'objects', {
        set: function(value) {
          _list = value;
          this.clear();
          this.render();
        },
        get: function() {
          return _list;
        }
      });

      /**
       * @param {number} [page = 0]
       */
      this.render = function(page) {
        page = typeof page === 'undefined' ? this.page : page;

        if (Array.isArray(_list) && _list.length > 0) {
          var from = page * this.objectsPerPage,
            to = from + this.objectsPerPage;

          this.objects.slice(from, to).forEach(function(object) {
            object = new constructor(object);
            renderedObjects.push(object);
            this.element.appendChild(object.render());
          }, this);
        } else if (typeof this.onempty === 'function') {
          var empty = this.onempty();
          renderedObjects.push(empty);
          this.element.appendChild(empty.render());
        }
        this.more.classList.toggle('invisible', this.isPageLast);
      };

      this.clear = function() {
        renderedObjects.forEach(function(object) {
          object.remove();
        });
        renderedObjects = [];
        this.page = 0;
      };

      this.showMore = function() {
        this.page++;
        this.render(this.page);
      };

      this.showMore = this.showMore.bind(this);
      this.more.addEventListener('click', this.showMore);
    }
  };
});

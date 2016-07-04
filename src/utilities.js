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
  /**
   * @param {Element} element
   * @param {string} text
   * @constructor
   */
  function Message(element, text) {
    this.element = element;
    this.element.textContent = text;
  }

  Message.prototype.render = function() {
    return this.element;
  };

  Message.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };

  /**
   * @param {Element} element
   * @param {filterCallback} callback
   * @constructor
   */
  function Filter(element, callback) {
    this.element = element;
    this.filter = callback;
  }

  /**
   * @param {Element} element
   * @param {Array.<Filter>} filters
   * @param {number} [currentIndex = 0]
   * @constructor
   */
  function Filters(element, filters, currentIndex) {
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

    this.handler = this.handler.bind(this);
    this.element.addEventListener('click', this.handler);
  }

  /**
   * @param {Event} evt
   */
  Filters.prototype.handler = function(evt) {
    var index = this.filters.map(function(filter) {
      return filter.element;
    }).indexOf(evt.target);

    if (index !== -1) {
      this.current = this.filters[index];
    }
  };

  /**
   * @param {Element} element
   * @param {Element} moreBtn
   * @param {Array.<Object>} objects
   * @param {constructor} constructor
   * @param {number} objectsPerPage
   * @constructor
   */
  function PaginatedList(element, moreBtn, objects, constructor, objectsPerPage) {
    this.element = element;
    this.more = moreBtn;
    this.renderedObjects = [];
    this.ObjConstructor = constructor;
    this.page = 0;
    this.objectsPerPage = objectsPerPage;
    /** @type {function()} */
    this.onempty = 'undefined';

    var _list = objects;

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

    this.showMore = this.showMore.bind(this);
    this.more.addEventListener('click', this.showMore);
  }

  /**
   * @param {number} [page = 0]
   */
  PaginatedList.prototype.render = function(page) {
    page = typeof page === 'undefined' ? this.page : page;

    if (Array.isArray(this.objects) && this.objects.length > 0) {
      var from = page * this.objectsPerPage,
        to = from + this.objectsPerPage;

      this.objects.slice(from, to).forEach(function(object) {
        object = new this.ObjConstructor(object);
        this.renderedObjects.push(object);
        this.element.appendChild(object.render());
      }, this);
    } else if (typeof this.onempty === 'function') {
      var empty = this.onempty();
      this.renderedObjects.push(empty);
      this.element.appendChild(empty.render());
    }
    this.more.classList.toggle('invisible', this.isPageLast);
  };

  PaginatedList.prototype.showMore = function() {
    this.page++;
    this.render(this.page);
  };

  PaginatedList.prototype.clear = function() {
    this.renderedObjects.forEach(function(object) {
      object.remove();
    });
    this.renderedObjects = [];
    this.page = 0;
  };

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
     * @param {Function} Child
     * @param {Function} Parent
     */
    inherit: function(Child, Parent) {
      var EmptyConstructor = function() {};
      EmptyConstructor.prototype = Parent.prototype;
      Child.prototype = new EmptyConstructor();
    },
    Message: Message,
    Filter: Filter,
    Filters: Filters,
    PaginatedList: PaginatedList
  };
});

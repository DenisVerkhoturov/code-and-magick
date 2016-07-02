'use strict';

define(
  'reviews',
  [
    './review',
    './utilities'
  ],
  function(Review, utils) {
    var
      /** @constant {String} */
      url = '//o0.github.io/assets/json/reviews.json',
      filterContainer = document.querySelector('form.reviews-filter'),
      FILTERS = [
        new Filter(
          filterContainer.querySelector('#reviews-all'),
          function(reviews) {
            return reviews;
          }),
        new Filter(
          filterContainer.querySelector('#reviews-recent'),
          function(reviews) {
            return reviews
              .filter(function(review) {
                return review.date > Date.now();
              })
              .sort(function(a, b) {
                return b.date - a.date;
              });
          }),
        new Filter(
          filterContainer.querySelector('#reviews-good'),
          function(reviews) {
            return reviews
              .filter(function(review) {
                return review.rating > 2;
              })
              .sort(function(a, b) {
                return b.rating - a.rating;
              });
          }),
        new Filter(
          filterContainer.querySelector('#reviews-bad'),
          function(reviews) {
            return reviews
              .filter(function(review) {
                return review.rating < 3;
              })
              .sort(function(a, b) {
                return a.rating - b.rating;
              });
          }),
        new Filter(
          filterContainer.querySelector('#reviews-popular'),
          function(reviews) {
            return reviews.slice().sort(function(a, b) {
              return b.review_usefulness - a.review_usefulness;
            });
          })
      ];

    /**
     * @param {Array.<Object>} objects
     * @constructor
     */
    function Reviews(objects) {
      this.data = objects;
      this.element = '';
      this.filters = new Filters(FILTERS);
      this.list = new PaginatedList(this.data, Review, 3);

      this.filters.onchange = function(filter) {
        this.list.objects = filter(this.data);
      }.bind(this);

      this.render = function() {
        this.list.render();
      };
    }

    function Message(text) {
      this.element = utils.getElement('template#message-template', 'p.message');
      this.element.textContent = text;

      this.render = function() {
        return this.element;
      };

      this.remove = function() {
        this.element.parentNode.removeChild(this.element);
      };
    }

    /**
     * @callback constructor
     * @param {Object} object
     * @return {Object}
     */
    /**
     * @param {Array.<Object>} objects
     * @param {constructor} constructor
     * @param {number} objectsPerPage
     * @constructor
     */
    function PaginatedList(objects, constructor, objectsPerPage) {
      this.element = document.querySelector('div.reviews-list');
      this.more = document.querySelector('span.reviews-controls-more');
      this.page = 0;
      this.objectsPerPage = objectsPerPage;

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
        } else {
          var message = new Message('К сожалению, ничего не найдено...');
          renderedObjects.push(message);
          this.element.appendChild(message.render());
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

    /**
     * @param {Array.<Filter>} filters
     * @param {Filter} [current = filters[0]]
     * @constructor
     */
    function Filters(filters, current) {
      current = typeof current === 'undefined' ? filters[0] : current;
      this.element = document.querySelector('form.reviews-filter');
      this.filters = filters;
      this.onchange = 'undefined';

      var _current = current;

      Object.defineProperty(this, 'current', {
        set: function(value) {
          _current = value;
          if (typeof this.onchange === 'function') {
            this.onchange(_current.filter);
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
    }

    /**
     * @callback filterCallback
     * @param {Array} array
     * @returns {Array}
     */
    /**
     * @param {Element} element
     * @param {filterCallback} callback
     * @constructor
     */
    function Filter(element, callback) {
      this.element = element;
      /**
       * @param {Array}
       * @returns {Array}
       */
      this.filter = callback;
    }

    return {
      init: function() {
        var reviews;
        utils.ajax(url, function(response) {
          reviews = new Reviews(response);
          reviews.render();
        });
      }
    };
  }
)
;

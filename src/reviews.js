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
      filtersElement = document.querySelector('form.reviews-filter'),
      messageElement = utils.getElement('template#message-template', 'p.message'),
      listElement = document.querySelector('div.reviews-list'),
      moreBtn = document.querySelector('span.reviews-controls-more'),
      FILTERS = [
        new utils.Filter(
          filtersElement.querySelector('#reviews-all'),
          function(reviews) {
            return reviews;
          }),
        new utils.Filter(
          filtersElement.querySelector('#reviews-recent'),
          function(reviews) {
            return reviews
              .filter(function(review) {
                return review.date > Date.now();
              })
              .sort(function(a, b) {
                return b.date - a.date;
              });
          }),
        new utils.Filter(
          filtersElement.querySelector('#reviews-good'),
          function(reviews) {
            return reviews
              .filter(function(review) {
                return review.rating > 2;
              })
              .sort(function(a, b) {
                return b.rating - a.rating;
              });
          }),
        new utils.Filter(
          filtersElement.querySelector('#reviews-bad'),
          function(reviews) {
            return reviews
              .filter(function(review) {
                return review.rating < 3;
              })
              .sort(function(a, b) {
                return a.rating - b.rating;
              });
          }),
        new utils.Filter(
          filtersElement.querySelector('#reviews-popular'),
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
      this.filters = new utils.Filters(filtersElement, FILTERS);
      this.list = new utils.PaginatedList(listElement, moreBtn, this.data, Review, 3);

      this.filters.onchange = function(element, filter) {
        localStorage.setItem('filter', element.value);
        this.list.objects = filter(this.data);
      }.bind(this);

      this.list.onempty = function() {
        return new utils.Message(messageElement, 'К сожалению, ничего не найдено...');
      };

      this.restoreState = function() {
        var storageFilterElement = document.getElementById(localStorage.getItem('filter')),
          currentFilter = FILTERS.filter(function(filter) {
            return filter.element === storageFilterElement;
          }).pop();

        if (currentFilter) {
          storageFilterElement.checked = true;
          this.filters.current = currentFilter;
        }
      };
    }

    return {
      init: function() {
        var reviews;
        utils.ajax(url, function(response) {
          reviews = new Reviews(response);
          reviews.restoreState();
        });
      }
    };
  }
)
;

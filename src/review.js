'use strict';

/**
 * @callback constructor
 * @param {Object} object
 * @return {Object}
 */
define(
  'review',
  ['./utilities'],
  function(utils) {
    var IMAGE_WIDTH = 124,
      /** @constant {number} */
      IMAGE_HEIGHT = 124,
      /** @constant {number} */
      IMAGE_LOAD_TIMEOUT = 5000,
      /** @constant {number} */
      RATING_STAR_WIDTH = 30;

    /**
     * @param {Object} object
     * @param {Object} object.author
     * @param {string} object.author.name
     * @param {string} object.author.picture
     * @param {string|Date} object.date
     * @param {string} object.description
     * @param {number} object.rating
     * @param {number} object.review_usefulness
     * @constructor
     */
    function Review(object) {
      object.date = typeof object.date === 'string' ? new Date(object.date) : object.date;

      this.data = object;
      this.element = utils.getElement('template#review-template', 'article.review');

      /**
       * @returns {Node}
       */
      this.render = function() {
        var image = new Image(),
          imageLoadTimeout = setTimeout(image.onerror, IMAGE_LOAD_TIMEOUT),
          author = this.element.querySelector('.review-author'),
          description = this.element.querySelector('.review-text'),
          rating = this.element.querySelector('.review-rating');

        image.onload = function() {
          clearTimeout(imageLoadTimeout);
          author.width = IMAGE_WIDTH;
          author.height = IMAGE_HEIGHT;
          author.src = this.src;
        };

        image.onerror = function() {
          this.element.classList.add('review-load-failure');
        }.bind(this);

        description.textContent = this.data.description;
        rating.style.width = RATING_STAR_WIDTH * this.data.rating + 'px';
        author.title = this.data.author.name;
        image.src = this.data.author.picture;

        return this.element;
      };

      this.remove = function() {
        this.element.parentNode.removeChild(this.element);
      };

      this.handler = function() {};
    }

    return Review;
  }
);

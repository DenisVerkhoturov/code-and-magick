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
    var
      /** @constant {number} */
      IMAGE_WIDTH = 124,
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
      this.element = utils.getElement('template#review-template', 'article.review');
      this.data = object;

      this.handler = this.handler.bind(this);
      this.element.addEventListener('click', this.handler);
    }

    /**
     * @returns {Node}
     */
    Review.prototype.render = function() {
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

    Review.prototype.remove = function() {
      this.element.removeEventListener('click', this.handler);
      this.element.parentNode.removeChild(this.element);
    };

    /**
     * @param {Event} evt
     */
    Review.prototype.handler = function(evt) {
      if (evt.target.classList.contains('review-quiz-answer')) {
        Array.prototype.forEach.call(
          this.element.querySelectorAll('.review-quiz-answer'),
          function(answer) {
            answer.classList.remove('review-quiz-answer-active');
          }
        );
        evt.target.classList.add('review-quiz-answer-active');
      }
    };

    return Review;
  }
);

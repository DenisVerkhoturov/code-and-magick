'use strict';

(function() {

  /** Константы */
  var
    /** @constant {String} */
    REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json',

    /** @constant {number} */
    IMAGE_WIDTH = 124,

    /** @constant {number} */
    IMAGE_HEIGHT = 124,

    /** @constant {number} */
    IMAGE_LOAD_TIMEOUT = 5000,

    /** @constant {number} */
    RATING_STAR_WIDTH = 30;

  /** Перечисления */
  var
    /** @enum {String} */
    Filter = {
      ALL: 'reviews-all',
      RECENT: 'reviews-recent',
      GOOD: 'reviews-good',
      BAD: 'reviews-bad',
      POPULAR: 'reviews-popular'
    };

  /** HTML Элементы */
  var
    /** @type {Element} */
    reviewTemplate = getTemplateWithFallback('template#review-template', 'article.review'),

    /** @type {Element} */
    filterContainer = document.querySelector('form.reviews-filter'),

    /** @type {Element} */
    reviewsContainer = document.querySelector('div.reviews-list'),

    /** @type {Element} */
    messageTemplate = getTemplateWithFallback('template#message-template', 'p.message');

  /** Перемененные */
  var
    /** @type {Array.<Object>} */
    reviews = [];

  /**
   * @param {function(Array.<Object>)} callback
   */
  function getReviews(callback) {
    var xhr = new XMLHttpRequest();

    reviewsContainer.classList.add('reviews-list-loading');

    xhr.onerror = xhr.timeout = function() {
      reviewsContainer.classList.remove('reviews-list-loading');
      reviewsContainer.classList.add('reviews-load-failure');
    };

    xhr.onload = function() {
      if (xhr.status === 200) {
        reviews = JSON.parse(xhr.responseText);
        reviewsContainer.classList.remove('reviews-list-loading');
        callback(reviews);
      } else {
        xhr.onerror();
      }
    };

    xhr.open('GET', REVIEWS_LOAD_URL);
    xhr.send();
  }

  /**
   * @param {String} templateSelector
   * @param {String} elementSelector
   */
  function getTemplateWithFallback(templateSelector, elementSelector) {
    var element = document.querySelector(templateSelector);

    if ('content' in element) {
      element = element.content.querySelector(elementSelector);
    } else {
      element = element.querySelector(elementSelector);
    }

    return element;
  }

  /**
   * @param {Array.<Object>} list
   */
  function renderReviews(list) {
    reviewsContainer.innerHTML = '';
    filterContainer.classList.add('invisible');

    if (list.length > 0) {
      list.forEach(function(review) {
        reviewsContainer.appendChild(buildReviewElement(review));
      });
    } else {
      var message = messageTemplate.cloneNode(true);
      message.textContent = 'Не найдено ни одно отзыва.';
      reviewsContainer.appendChild(message);
    }
    filterContainer.classList.remove('invisible');
  }

  /**
   * @param {Object} review Объект отзыва, для которого необходимо построить элемент.
   * @returns {Node} HTML представление отзыва, готовое для рендера на страницу.
   */
  function buildReviewElement(review) {
    var element = reviewTemplate.cloneNode(true),
      image = new Image(),
      imageLoadTimeout = setTimeout(image.error, IMAGE_LOAD_TIMEOUT),
      author = element.querySelector('.review-author'),
      description = element.querySelector('.review-text'),
      rating = element.querySelector('.review-rating');

    image.onload = function() {
      clearTimeout(imageLoadTimeout);
      author.width = IMAGE_WIDTH;
      author.height = IMAGE_HEIGHT;
      author.src = this.src;
    };

    image.onerror = function() {
      element.classList.add('review-load-failure');
    };

    description.textContent = review.description;
    rating.style.width = RATING_STAR_WIDTH * review.rating + 'px';
    author.title = review.author.name;
    image.src = review.author.picture;

    return element;
  }

  /**
   * @param {Filter.<String>} filter
   */
  function renderByFilter(filter) {
    var list;

    switch (filter) {
      case Filter.RECENT:
        var now = new Date(),
          recentDate = now.setDate(now.getDate() - 4);

        list = reviews
          .map(function(review) {
            review.date = new Date(review.date);
            return review;
          })
          .filter(function(review) {
            return review.date > recentDate;
          })
          .sort(function(a, b) {
            return b.date - a.date;
          });
        break;
      case Filter.GOOD:
        list = reviews
          .filter(function(review) {
            return review.rating > 2;
          })
          .sort(function(a, b) {
            return b.rating - a.rating;
          });
        break;
      case Filter.BAD:
        list = reviews
          .filter(function(review) {
            return review.rating < 3;
          })
          .sort(function(a, b) {
            return a.rating - b.rating;
          });
        break;
      case Filter.POPULAR:
        list = reviews
          .map(function(review) {
            return review;
          })
          .sort(function(a, b) {
            return b.review_usefulness - a.review_usefulness;
          });
        break;
      case Filter.ALL:
      default:
        list = reviews;
        break;
    }

    renderReviews(list);
  }

  function setFiltrationEnabled() {
    var filters = filterContainer.querySelectorAll('input[type="radio"]');

    Array.prototype.forEach.call(filters, function(filter) {
      filter.addEventListener('click', function() {
        renderByFilter(this.id);
      });
    });
  }

  getReviews(renderReviews);
  setFiltrationEnabled();
})();

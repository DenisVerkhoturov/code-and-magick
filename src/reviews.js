'use strict';

(function() {
  var template = document.querySelector('template#review-template'),
    filter = document.querySelector('form.reviews-filter'),
    list = document.querySelector('div.reviews-list'),
    reviews = window.reviews,
    IMAGE_WIDTH = 124,
    IMAGE_HEIGHT = 124,
    IMAGE_LOAD_TIMEOUT = 5000,
    RATING_STAR_WIDTH = 30,
    buildReviewElement = function(review) {
      var element = template.cloneNode(true),
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
    };

  if ('content' in template) {
    template = template.content.querySelector('article.review');
  } else {
    template = template.querySelector('article.review');
  }

  filter.classList.add('invisible');
  reviews.forEach(function(review) {
    list.appendChild(buildReviewElement(review));
  });
  filter.classList.remove('invisible');
})();

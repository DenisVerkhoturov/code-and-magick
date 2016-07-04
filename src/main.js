'use strict';

require(
  [
    './utilities',
    './form',
    './game',
    './gallery',
    './reviews'
  ],
  function(utils, form, Game, gallery, reviews) {
    var game = new Game(document.querySelector('.demo')),
      clouds = document.querySelector('.header-clouds'),
      isCloudsVisible = true;

    game.initializeLevelAndStart();
    game.setGameStatus(game.Verdict.INTRO);

    window.addEventListener('scroll', utils.throttle(function() {
      isCloudsVisible = clouds.getBoundingClientRect().bottom >= 0;
    }, 100));

    window.addEventListener('scroll', function() {
      if (isCloudsVisible) {
        clouds.style.backgroundPositionX = document.body.scrollTop / 4 + 'px';
      }

      if (game.container.getBoundingClientRect().bottom < 0) {
        game.setGameStatus(game.Verdict.PAUSE);
      }
    });

    reviews.init();
  }
);

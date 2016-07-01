'use strict';

require(
  [
    './utilities',
    './form',
    './game',
    './reviews',
    './gallery'
  ],
  function(utils, form, Game, reviews, gallery) {
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

    var photoGallery = document.querySelector('.photogallery'),
      pictures = [].map.call(photoGallery.querySelectorAll('.photogallery-image img'), function(img) {
        return img.src;
      });

    gallery.setPictures(pictures);

    photoGallery.addEventListener('click', function(evt) {
      if (evt.target.nodeName === 'IMG') {
        gallery.show(pictures.indexOf(evt.target.src));
      }
    });
  });

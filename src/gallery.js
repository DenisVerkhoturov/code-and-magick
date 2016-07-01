'use strict';

define(
  'gallery',
  function() {
    var
      /** @type {Element} */
      container = document.querySelector('.overlay-gallery'),
      /** @type {Element} */
      closeBtn = container.querySelector('.overlay-gallery-close'),
      /** @type {Element} */
      preview = container.querySelector('.overlay-gallery-preview'),
      /** @type {Element} */
      prevBtn = container.querySelector('.overlay-gallery-control-left'),
      /** @type {Element} */
      nextBtn = container.querySelector('.overlay-gallery-control-right'),
      /** @type {Element} */
      currentIndicator = container.querySelector('.preview-number-current'),
      /** @type {Element} */
      totalIndicator = container.querySelector('.preview-number-total'),
      /** @type {Array} */
      pictures = [],
      /** @type {number} */
      current = 0,
      /** @enum {number} */
      KEYS = {
        ESC: 27,
        LEFT: 37,
        RIGHT: 39
      };

    function prev() {
      if (current > 0) {
        current--;
        update();
      }
    }

    function next() {
      if (current < pictures.length - 1) {
        current++;
        update();
      }
    }

    function update() {
      preview.style.backgroundImage = 'url("' + pictures[current] + '")';
      currentIndicator.textContent = current + 1;
      totalIndicator.textContent = pictures.length;
    }

    /**
     * @param {Event} evt
     * @private
     */
    function onDocumentKeyDown(evt) {
      switch (evt.keyCode) {
        case KEYS.ESC:
          hide();
          break;
        case KEYS.LEFT:
          prev();
          break;
        case KEYS.RIGHT:
          next();
          break;
      }
    }

    /**
     * @param {number} [index]
     */
    function show(index) {
      if (index < pictures.length) {
        current = index;
      }
      update();
      container.classList.remove('invisible');
      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
      closeBtn.addEventListener('click', hide);
      document.body.addEventListener('keyup', onDocumentKeyDown);
    }

    function hide() {
      container.classList.add('invisible');
      prevBtn.removeEventListener('click', prev);
      nextBtn.removeEventListener('click', next);
      closeBtn.removeEventListener('click', hide);
      document.body.removeEventListener('keyup', onDocumentKeyDown);
    }

    return {
      /**
       * @param {Array.<string>} urls
       */
      setPictures: function(urls) {
        pictures = urls;
      },
      show: show
    };
  }
);

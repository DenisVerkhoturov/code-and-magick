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
        render();
      }
    }

    function next() {
      if (current < pictures.length - 1) {
        current++;
        render();
      }
    }

    function render() {
      /** @type {Image} */
      var img = new Image();

      currentIndicator.textContent = current + 1;
      totalIndicator.textContent = pictures.length;

      img.onload = function() {
        preview.style.width = this.width + 'px';
        preview.style.height = this.height + 'px';
        preview.style.backgroundImage = 'url("' + this.src + '")';
      };

      img.src = pictures[current];
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
      render();
      container.classList.remove('invisible');
      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
      closeBtn.addEventListener('click', hide);
      document.body.addEventListener('keyup', onDocumentKeyDown);
      document.body.style.overflow = 'hidden';
    }

    function hide() {
      container.classList.add('invisible');
      prevBtn.removeEventListener('click', prev);
      nextBtn.removeEventListener('click', next);
      closeBtn.removeEventListener('click', hide);
      document.body.removeEventListener('keyup', onDocumentKeyDown);
      document.body.style.overflow = null;
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

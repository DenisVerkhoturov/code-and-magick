'use strict';

define(
  'gallery',
  function() {
    var
      /** @enum {number} */
      KEYS = {
        ESC: 27,
        LEFT: 37,
        RIGHT: 39
      };

    /**
     * @param pictures
     * @constructor
     */
    function Gallery(pictures) {
      this.container = document.querySelector('.overlay-gallery');
      this.closeBtn = this.container.querySelector('.overlay-gallery-close');
      this.preview = this.container.querySelector('.overlay-gallery-preview');
      this.prevBtn = this.container.querySelector('.overlay-gallery-control-left');
      this.nextBtn = this.container.querySelector('.overlay-gallery-control-right');
      this.currentIndicator = this.container.querySelector('.preview-number-current');
      this.totalIndicator = this.container.querySelector('.preview-number-total');
      this.pictures = pictures;
      this.current = 0;

      this.render = function() {
        /** @type {Image} */
        var img = new Image(),
          preview = this.preview;

        this.currentIndicator.textContent = this.current + 1;
        this.totalIndicator.textContent = pictures.length;

        img.onload = function() {
          preview.style.width = this.width + 'px';
          preview.style.height = this.height + 'px';
          preview.style.backgroundImage = 'url("' + this.src + '")';
        };

        img.src = pictures[this.current];
      };

      this.prev = function() {
        if (this.current > 0) {
          this.current--;
          this.render();
        }
      };

      this.next = function() {
        if (this.current < this.pictures.length - 1) {
          this.current++;
          this.render();
        }
      };

      /**
       * @param {number} [index]
       */
      this.show = function(index) {
        if (index < this.pictures.length) {
          this.current = index;
        }
        this.render();
        this.container.classList.remove('invisible');
        this.prevBtn.addEventListener('click', this.prev);
        this.nextBtn.addEventListener('click', this.next);
        this.closeBtn.addEventListener('click', this.hide);
        document.body.addEventListener('keydown', this.onDocumentKeyDown);
        document.body.style.overflow = 'hidden';
      };

      this.hide = function() {
        this.container.classList.add('invisible');
        this.prevBtn.removeEventListener('click', this.prev);
        this.nextBtn.removeEventListener('click', this.next);
        this.closeBtn.removeEventListener('click', this.hide);
        document.body.removeEventListener('keydown', this.onDocumentKeyDown);
        document.body.style.overflow = null;
      };

      /**
       * @param {Event} evt
       * @private
       */
      this.onDocumentKeyDown = function(evt) {
        switch (evt.keyCode) {
          case KEYS.ESC:
            this.hide();
            break;
          case KEYS.LEFT:
            this.prev();
            break;
          case KEYS.RIGHT:
            this.next();
            break;
        }
      };

      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    }

    var photoGallery = document.querySelector('.photogallery'),
      pictures = [].map.call(photoGallery.querySelectorAll('.photogallery-image img'), function(img) {
        return img.src;
      }),
      gallery = new Gallery(pictures);

    photoGallery.addEventListener('click', function(evt) {
      if (evt.target.nodeName === 'IMG') {
        gallery.show(pictures.indexOf(evt.target.src));
      }
    });

    return gallery;
  }
);

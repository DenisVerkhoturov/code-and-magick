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

      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
      this._onHashChange = this._onHashChange.bind(this);
      window.addEventListener('hashchange', this._onHashChange);
      this._onHashChange();
    }


    Gallery.prototype.prev = function() {
      if (this.current > 0) {
        location.hash = '#photo/' + this.pictures[--this.current];
      }
    };

    Gallery.prototype.next = function() {
      if (this.current < this.pictures.length - 1) {
        location.hash = '#photo/' + this.pictures[++this.current];
      }
    };

    Gallery.prototype.render = function() {
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

    /**
     * @param {number|string} [picture]
     */
    Gallery.prototype.show = function(picture) {
      if (typeof picture === 'number' && picture >= 0 && picture < this.pictures.length) {
        this.current = picture;
      }
      if (typeof picture === 'string') {
        var indexOfPicture = this.pictures.indexOf(picture);
        this.current = indexOfPicture === -1 ? this.current : indexOfPicture;
      }
      this.render();
      this.container.classList.remove('invisible');
      this.prevBtn.addEventListener('click', this.prev);
      this.nextBtn.addEventListener('click', this.next);
      this.closeBtn.addEventListener('click', this.hide);
      document.body.addEventListener('keydown', this._onDocumentKeyDown);
      document.body.style.overflow = 'hidden';
    };

    Gallery.prototype.hide = function() {
      this.container.classList.add('invisible');
      this.prevBtn.removeEventListener('click', this.prev);
      this.nextBtn.removeEventListener('click', this.next);
      this.closeBtn.removeEventListener('click', this.hide);
      document.body.removeEventListener('keydown', this._onDocumentKeyDown);
      document.body.style.overflow = null;
      location.hash = '';
    };

    /**
     * @param {Event} evt
     * @private
     */
    Gallery.prototype._onDocumentKeyDown = function(evt) {
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

    /**
     * @private
     */
    Gallery.prototype._onHashChange = function() {
      var picture = location.hash.match(/^#photo\/(.*)/);
      if (picture) {
        this.show(picture[1]);
      }
    };

    var photoGallery = document.querySelector('.photogallery'),
      pictures = Array.prototype.map.call(
        photoGallery.querySelectorAll('.photogallery-image img'),
        function(img) {
          return img.getAttribute('src');
        }
      ),
      gallery = new Gallery(pictures);

    photoGallery.addEventListener('click', function(evt) {
      evt.preventDefault();
      if (evt.target.nodeName === 'IMG') {
        location.hash = '#photo/' + evt.target.getAttribute('src');
      }
    });

    return gallery;
  }
);

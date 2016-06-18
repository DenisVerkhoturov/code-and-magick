'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container'),
    formOpenButton = document.querySelector('.reviews-controls-new'),
    formCloseButton = document.querySelector('.review-form-close'),
    form = document.querySelector('form.review-form'),
    markGroup = form.querySelector('.review-form-group-mark'),
    nameInput = form.querySelector('.review-form-field-name'),
    textInput = form.querySelector('.review-form-field-text'),
    reviewFields = form.querySelector('.review-fields'),
    reviewFieldsName = reviewFields.querySelector('[for="review-name"]'),
    reviewFieldsText = reviewFields.querySelector('[for="review-text"]'),
    formSubmitButton = form.querySelector('button[type="submit"]'),
    getCurrentMark = function() {
      return markGroup.querySelector('input[name="review-mark"]:checked').value;
    },
    formValidate = function() {
      textInput.required = getCurrentMark() < 3;

      if (nameInput.checkValidity()) {
        reviewFieldsName.classList.add('invisible');
      } else {
        reviewFieldsName.classList.remove('invisible');
      }

      if (textInput.checkValidity()) {
        reviewFieldsText.classList.add('invisible');
      } else {
        reviewFieldsText.classList.remove('invisible');
      }

      if (nameInput.checkValidity() && textInput.checkValidity()) {
        reviewFields.classList.add('invisible');
        formSubmitButton.disabled = false;
      } else {
        reviewFields.classList.remove('invisible');
        formSubmitButton.disabled = true;
      }
    };

  formOpenButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  });

  formCloseButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  });

  markGroup.addEventListener('change', formValidate);
  nameInput.addEventListener('input', formValidate);
  textInput.addEventListener('input', formValidate);
  nameInput.required = true;
  formValidate();
})();

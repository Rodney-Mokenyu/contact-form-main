document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('button[type="submit"]');

  // Validation function for text/email/textarea inputs
  function validateInput(id) {
    const input = document.getElementById(id);
    const errorElement = input.nextElementSibling; // Gets the <p> after input

    if (input.value.trim() === '') {
      if (errorElement) {
        errorElement.classList.remove('d-none');
        errorElement.classList.add('d-block');
        input.style.borderColor = 'red';
      }
      return false;
    } else {
      if (errorElement) {
        errorElement.classList.remove('d-block');
        errorElement.classList.add('d-none');
        input.style.borderColor = '';
      }
      return true;
    }
  }

  // Validate function for checkbox inputs
  function validateCheckbox(id) {
    const checkbox = document.getElementById(id);
    const errorElement = checkbox.nextElementSibling; // Gets the <p> after checkbox

    if (!checkbox.checked) {
      if (errorElement) {
        errorElement.classList.remove('d-none');
        errorElement.classList.add('d-block');
      }
      return false;
    } else {
      if (errorElement) {
        errorElement.classList.remove('d-block');
        errorElement.classList.add('d-none');
      }
      return true;
    }
  }

  // Validate function for radio inputs
  function validateRadioGroup(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    const errorElement = radios[0].closest('.radio-box').querySelector('.error-message');

    const isChecked = Array.from(radios).some(radio => radio.checked);

    if (!isChecked) {
      errorElement.classList.remove('d-none');
      errorElement.classList.add('d-block');
      return false;
    } else {
      errorElement.classList.add('d-none');
      errorElement.classList.remove('d-block');
      return true;
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isFirstNameValid = validateInput('first-name');
    const isLastNameValid = validateInput('last-name');
    const isEmailValid = validateInput('email');
    const isMessageValid = validateInput('message');
    const isTermsAccepted = validateCheckbox('consent');
    const isQuerySubmitted = validateRadioGroup('query-type');

    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid && isQuerySubmitted && isTermsAccepted) {
      const msgSentNotifier = document.querySelector('.form_submitted_message');
      if (msgSentNotifier) {
        msgSentNotifier.classList.remove('d-none');
        msgSentNotifier.classList.add('d-block');
        form.reset();
        setTimeout(() => {
          msgSentNotifier.classList.remove('d-block');
          msgSentNotifier.classList.add('d-none');
        }, 3000);
      }
    }
  });
});

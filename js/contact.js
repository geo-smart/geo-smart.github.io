"use strict";
(function() {
  
  window.addEventListener("load", init);

  function init() {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", handleSubmit);
  }

  function handleSubmit(evt) {
    const submit = document.getElementById("contact-submit");
    const success = document.querySelector(".w-form-done");
    const fail = document.querySelector(".w-form-fail");
    evt.preventDefault();

    const name = document.getElementById("name-field").value;
    const email = document.getElementById("email-field").value;
    const message = document.getElementById("message-field").value;

    submit.classList.add("anim-hide");
    fail.classList.remove("anim-hide");
    setTimeout(() => {
      fail.classList.add("anim-hide");
      submit.classList.remove("anim-hide");
    }, 3500);
  }

})();
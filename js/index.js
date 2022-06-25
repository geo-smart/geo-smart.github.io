'use strict';
(function() {

  window.addEventListener('load', init);

  function init() {
    setNavbarHighlight(document.URL);

    const menu_btn = document.getElementById('menu-button');
    const menu = document.getElementById('w-nav-overlay-0');
    menu_btn.addEventListener('click', () => {
      menu.classList.toggle('invisible');
    });
  }

  function setNavbarHighlight(url) {
    const page_regex = /\/[a-zA-Z0-9]+\.html/;
    let raw = url.match(page_regex);

    if (raw) {
      raw = raw[0];
      const page = raw.substring(1, raw.length - 5).toLowerCase();

      const buttons = document.querySelectorAll('.navigation-item');
      for (let i = 0; i < buttons.length; i++) {
        const tab = buttons[i].innerText.toLowerCase();

        if (tab === page) {
          buttons[i].classList.add('w--current');
        } else {
          buttons[i].classList.remove('w--current');
        }
      }
    }
  }

})();
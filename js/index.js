'use strict';
(function () {

  window.addEventListener('load', init);

  /**
   * Initialization function that should handle anything that needs to occur
   * on page load (include changing from one page to another).
   */
  function init() {
    setNavbarHighlight(document.URL);

    const menu_btn = document.getElementById('menu-button');
    const menu = document.getElementById('w-nav-overlay-0');
    menu_btn.addEventListener('click', () => {
      menu.classList.toggle('invisible');
    });

    window.addEventListener('resize', fixMenuVisibility);
  }

  /**
   * Uses the url to determine which page the user is currently on and appropriately style
   * the navbar buttons.
   * @param {string} url the page url, given by document.URL
   */
  function setNavbarHighlight(url) {
    // Matches the /page.html part of a url
    // const page_regex = /\/[a-zA-Z0-9]+\.html/;
    // Matches the /page part of a url
    const page_regex = /\/[a-zA-Z0-9]+$/;
    let raw = url.match(page_regex);

    if (raw) {
      raw = raw[0];
      // const page = raw.substring(1, raw.length - 5).toLowerCase();
      const page = raw.substring(1).toLowerCase();

      const buttons = document.querySelectorAll('.navigation-item');
      for (let i = 0; i < buttons.length; i++) {
        const tab = buttons[i].innerHTML.toLowerCase();
        // For some reason innerText doesn't work for the mobile buttons,
        // even though they should be identical (sans css) to the desktop ones?? 
        
        if (tab === page) {
          buttons[i].classList.add('w--current');
        } else {
          buttons[i].classList.remove('w--current');
        }
      }
    }
  }

  /**
   * In the event that the mobile navigation menu is open and then the window is resized
   * to a larger size that uses the regular navigation menu, this hides the mobile menu.
   */
  function fixMenuVisibility() {
    const mobile_menu = document.querySelector('.w-nav-overlay');
    if (window.innerWidth > 1150) {
      // We don't use class 'invisible' since otherwise this would overwrite the
      // menu's visibility. We just want to hide it if the user resizes back to a wider width.
      mobile_menu.classList.add('hidden');
    } else {
      mobile_menu.classList.remove('hidden');
    }
  }

})();
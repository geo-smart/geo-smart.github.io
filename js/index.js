'use strict';
(function () {

  window.addEventListener('load', init);

  /**
   * Initialization function that should handle anything that needs to occur
   * on page load (include changing from one page to another).
   */
  function init() {
    setNavbarHighlight(document.URL);
    constructPageNavigation();
    addAnimationObserver();

    const menu_btn = document.getElementById('menu-button');
    const menu = document.getElementById('w-nav-overlay-0');
    menu_btn.addEventListener('click', () => {
      menu.classList.toggle('invisible');
    });

    window.addEventListener('resize', fixMenuVisibility);

    // The scroll top button should work even without js enabled so it uses
    // an anchor, however that appends an ugly '#scroll-top' to the url so
    // for users with JS enabled, we do this:
    const scroll_btn = document.getElementById('scroll-top-button');
    scroll_btn.addEventListener('click', (evt) => {
      window.scrollTo({ top: '0', behavior: 'smooth' });
      evt.preventDefault();
    });
  }

  /**
   * Uses the url to determine which page the user is currently on and appropriately style
   * the navbar buttons.
   * @param {string} url the page url, given by document.URL
   */
  function setNavbarHighlight(url) {
    // const page_regex = /\/[a-zA-Z0-9]+\.html/;
    const page_regex = /\/[a-zA-Z0-9]+$/;
    let raw = url.match(page_regex);

    if (raw) {
      raw = raw[0];
      // Removing the '/' char preceding the page name
      const page = raw.substring(1).toLowerCase();

      const buttons = document.querySelectorAll('.navigation-item');
      for (let i = 0; i < buttons.length; i++) {
        const tab = buttons[i].innerHTML.toLowerCase().replace(/\s/g, '');

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

  /**
   * Builds up the left side bar page navigator based on any markers in the page.
   */
  function constructPageNavigation() {
    // The page navigator starts off empty and hidden. We want to build it
    // up based on the navigation markers in the page, if there are any. 
    const nav_markers = document.querySelectorAll('.page-nav-section-marker');
    const nav_container = document.getElementById('page-navigation');

    if (nav_markers.length > 0) {
      nav_container.classList.remove('hidden');

      // Before we add any nav buttons, lets add a node for the page top.
      const top_button = createNavButton('#scroll-top', '"Page Top"');
      top_button.classList.add('section-shown'); // We start at page top.
      nav_container.appendChild(top_button);

      for (let i = 0; i < nav_markers.length; i++) {
        const href = '#' + nav_markers[i].id;
        const label = '"' + nav_markers[i].id.replace(/_/g, ' ') + '"';

        const nav_button = createNavButton(href, label);
        nav_container.appendChild(nav_button);
      }

      // By similar logic to the the scroll to top button, we want to improve the 
      // functionality of these buttons for js enabled visitors, and leave the href as a fallback.
      const nav_buttons = document.querySelectorAll('.page-nav-item');
      const scrollOffset = -45;

      for (let i = 0; i < nav_buttons.length; i++) {
        nav_buttons[i].addEventListener('click', (evt) => {
          // We have to remove the first "#" character to get the id alone.
          const target = nav_buttons[i].getAttribute("href").substring(1);

          const element = document.getElementById(target);
          const yPos = element.getBoundingClientRect().top + window.pageYOffset + scrollOffset;
          window.scrollTo({ top: yPos, behavior: 'smooth' });

          evt.preventDefault();
        });
      }

      // This function ensures that the proper navigation button is shown as active
      // based on the section the page is currently scrolled to.
      function handleNavigationHighlight() {
        let furthest = 0;
        for (let i = 1; i < nav_buttons.length; i++) {
          const marker = nav_markers[i - 1];
          const button = nav_buttons[i];

          button.classList.remove('section-shown');
          if (window.scrollY > (marker.offsetTop + 1.5 * scrollOffset)) {
            furthest = i;
          }
        }

        nav_buttons[0].classList.remove('section-shown');
        nav_buttons[furthest].classList.add('section-shown');
      }

      window.addEventListener("scroll", handleNavigationHighlight);
      handleNavigationHighlight(); // Run this once in case we reload partway down the page.
    }
  }

  /**
   * Helper method to constructPageNavigation, creates a page navigation
   * button/node with the given href and label.
   * 
   * @param {string} href The id of the target element to scroll to
   * @param {string} label Displayed next to the node when the section is
   * active or when the button is hovered 
   */
  function createNavButton(href, label) {
    const nav_button = document.createElement('a');
    nav_button.classList.add('page-nav-item');
    nav_button.setAttribute('href', href);
    nav_button.style.setProperty('--label', label);

    return nav_button;
  }

  // /**
  //  * Creates an intersection observer which triggers animations for
  //  * some elements when they scroll onto the page by modifying their class.
  //  */
  // function addAnimationObserverOld() {
  //   const animated_items = document.querySelectorAll('.animated-item');

  //   // We could add the 'pre-anim' class in the javascript rather than the HTML 
  //   // since we want users without JS enabled to not see an empty page. However, 
  //   // at the moment the header is done via JS so the site is broken anyway for 
  //   // non-JS users. If we decide to support non-JS users, uncomment this line and
  //   // remove class 'pre-anim' from any elements that have it in the HTML.

  //   // animated_items.forEach((element) => element.classList.add('pre-anim'));

  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.3
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.remove('pre-anim');
  //       }
  //     })
  //   }, options);

  //   animated_items.forEach((element) => observer.observe(element));
  // }

  /**
   * Creates an intersection observer which triggers animations for
   * some elements when they scroll onto the page by modifying their class.
   */
  function addAnimationObserver() {
    const pop_anim_items = document.querySelectorAll('.pop-anim');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.45
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      })
    }, options);

    pop_anim_items.forEach((element) => observer.observe(element));
  }

})();
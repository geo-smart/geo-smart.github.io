'use strict';
(function () {

  window.addEventListener('load', init);
  var scrollDist = 0;

  function init() {
    addAccessibleClickListener(document.getElementById('blog-post-return'), showBlogList);

    const container = document.querySelector('.blog-list-wrap');
    const post_template = document.getElementById('blog-post-item');

    for (let i = 0; i < posts.length; i++) {
      const post = post_template.cloneNode(true);
      post.classList.remove('hidden');

      const wrapper = post.querySelector('.blog-summary-wrap');
      addAccessibleClickListener(wrapper, () => {
        window.location.hash = getHashForPost(post, i);
      });

      // Fill out the title, date and content
      post.querySelector('.blog-item-title').innerHTML = posts[i].title;
      post.querySelector('.blog-item-date').innerHTML = posts[i].date;
      post.querySelector('.blog-item-summary').innerHTML = (posts[i].blurb) ? posts[i].blurb : posts[i].body;

      container.appendChild(post);
    }

    addEventListener("popstate", () => {
      if (window.location.hash) {
        const post = getPostFromHash(window.location.hash);
        showBlogPost(post);
      } else {
        toggleView();
      }
    });
    
    if (window.location.hash) {
      const post = getPostFromHash(window.location.hash);
      showBlogPost(post);
    }
  }

  function showBlogPost(post) {
    toggleView();
    document.getElementById('blog-post-title').innerHTML = post.title;
    document.getElementById('blog-post-date').innerHTML = post.date;
    document.getElementById('blog-post-body').innerHTML = post.body;
    document.getElementById('blog-post-link').href = post.link;
  }

  function showBlogList() {
    toggleView();
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  function toggleView() {
    if (scrollDist) {
      scrollToWithDelay(scrollDist, 'smooth');
      scrollDist = 0;
    } else {
      scrollDist = window.scrollY;
      scrollToWithDelay(0);
    }

    document.getElementById('blog-items-list').classList.toggle('hidden');
    document.getElementById('blog-post').classList.toggle('hidden');
  }

  // In firefox there is a bug and scrolling immediately after modifying
  // the dom (in a way that affects document height) won't work.
  function scrollToWithDelay(scrollY, scrollBehavior) {
    scrollBehavior = scrollBehavior || 'instant';
    setTimeout(() => {
      window.scrollTo({ top: scrollY, behavior: scrollBehavior });
    }, 1);
  }

  // Adds the given function as both a click event listener
  // and a keydown event listener for accessiblity reasons.
  function addAccessibleClickListener(elem, func) {
    elem.addEventListener('click', func);
    elem.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') func(event);
    });
  }

  function getHashForPost(target, index) {
    index = index !== undefined ?
      index :
      posts.findIndex(post => {
        post.title === target.title;
        post.date === target.date;
        post.body === target.body;
        post.link === target.link;
      });
    return `article-${index + 1}`;
  }

  function getPostFromHash(hash) {
    const index = parseInt(hash.replace(/\D/g, ''));
    return posts[index - 1];
  }

})();
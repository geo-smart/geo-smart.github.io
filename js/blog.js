'use strict';
(function () {

  window.addEventListener('load', init);
  var blogPosts = null;
  var scrollDist = 0;

  function init() {
    addAccessibleClickListener(document.getElementById('blog-post-return'), showBlogList);
    loadPostFromHash();

    addEventListener("popstate", () => {
      if (window.location.hash) {
        const post = getPostFromHash(window.location.hash);
        showBlogPost(post);
      } else {
        toggleView();
      }
    });

    addEventListener("posts-loaded", (evt) => {
      const loader = document.getElementById('blog-loader');
      loader.classList.add('hidden');

      const posts = [];
      evt.posts.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        posts.push(doc.data());
      });

      posts.reverse();
      populateBlogList(posts);

      blogPosts = posts;
      loadPostFromHash();
    });
  }

  function populateBlogList(posts) {
    const container = document.querySelector('.blog-list-wrap');
    const post_template = document.getElementById('blog-post-item');
    const elements = [];

    for (let i = 0; i < posts.length; i++) {
      const post = post_template.cloneNode(true);
      post.classList.remove('hidden');
      post.id = "";

      const wrapper = post.querySelector('.blog-summary-wrap');
      addAccessibleClickListener(wrapper, () => {
        window.location.hash = getHashForPost(post, i);
      });

      // Fill out the title, date and content
      post.querySelector('.blog-item-title').innerHTML = posts[i].title;
      post.querySelector('.blog-item-date').innerHTML = formatDate(posts[i].date);
      post.querySelector('.blog-item-summary').innerHTML = (posts[i].blurb) ? posts[i].blurb : posts[i].body;

      container.appendChild(post);
      elements.push(post);
    }

    addAnimationObserver(elements); 
  }

  function showBlogPost(post) {
    toggleView();
    document.getElementById('blog-post-title').innerHTML = post.title;
    document.getElementById('blog-post-date').innerHTML = formatDate(post.date);
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

  /**
   * Creates an intersection observer which triggers animations for
   * some elements when they scroll onto the page by modifying their class.
   */
  function addAnimationObserver(animated_items) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.45
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre-anim');
        }
      })
    }, options);

    animated_items.forEach((element) => observer.observe(element));
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

  function loadPostFromHash() {
    if (!blogPosts || !window.location.hash) return;
    const post = getPostFromHash(window.location.hash);
    
    if (post) {
      showBlogPost(post);
    } else {
      // TODO: add a could not find the blog post page
    }
  }

  function getHashForPost(target, index) {
    index = index !== undefined ?
      index :
      blogPosts.findIndex(post => {
        post.title === target.title;
        post.date === target.date;
        post.body === target.body;
        post.link === target.link;
      });
    return `article-${index + 1}`;
  }

  function getPostFromHash(hash) {
    const index = parseInt(hash.replace(/\D/g, ''));
    return blogPosts[index - 1];
  }

  function formatDate(dateObj) {
    const { seconds, nanoseconds } = dateObj;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  }

})();
'use strict';
(function() {
  
  window.addEventListener('load', init);

  function init() {
    document.getElementById('blog-post-return').addEventListener('click', toggleView);

    const container = document.querySelector('.blog-list-wrap');
    const post_template = document.getElementById('blog-post-item');

    for (let i = 0; i < posts.length; i++) {
      const post = post_template.cloneNode(true);
      post.classList.remove('hidden');
      post.addEventListener('click', showBlogPost);
      post.post = posts[i];

      // Fill out the title, date and content
      post.querySelector('#blog-item-title').innerHTML = posts[i].title;
      post.querySelector('#blog-item-date').innerHTML = posts[i].date;
      post.querySelector('#blog-item-summary').innerHTML = (posts[i].blurb) ? posts[i].blurb : posts[i].body;
      
      container.appendChild(post);
    }
  }

  function showBlogPost(evt) {
    toggleView();
    const post = evt.currentTarget.post;
    document.getElementById('blog-post-title').innerHTML = post.title;
    document.getElementById('blog-post-date').innerHTML = post.date;
    document.getElementById('blog-post-body').innerHTML = post.body;
    document.getElementById('blog-post-link').href = post.link;
  }

  function toggleView() {
    document.getElementById('blog-items-list').classList.toggle('hidden');
    document.getElementById('blog-post').classList.toggle('hidden');
    window.scrollTo({ top: '0', behavior: 'smooth' });
  }

})();
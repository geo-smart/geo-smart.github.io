"use strict";
import { loadCollection, useCachedOrLoad } from "./firebase.js";
import { addAnimationObserver, formatDate } from "./utils.js";

(function () {

  /* ================ */
  /* GLOBAL VARIABLES */

  window.addEventListener("load", init);

  // When on the blog list view, scrollDist should be undefined
  // and when on the blog post view, scrollDist should be a number.
  // Otherwise, the autoscroll feature will break.
  var scrollDist = undefined;
  var blogPosts = null;

  /* GLOBAL VARIABLES */
  /* ================ */

  /**
   * This function handles everything that needs to occur after the window
   * has fully loaded, meaning in this case event listeners.
   */
  function init() {
    useCachedOrLoad("posts").then(res => {
      blogPosts = res;
      window.dispatchEvent(new Event("posts-loaded"));
    });

    addAccessibleClickListener(document.getElementById("blog-post-return"), showBlogList);

    addEventListener("popstate", () => {
      if (window.location.hash === "#refresh") {
        const loader = document.getElementById("blog-loader");
        loader.classList.remove("hidden");

        clearBlogListOfPosts();
        loadPosts();

        history.pushState("", document.title, window.location.pathname + window.location.search);
        scrollToWithDelay(0, "smooth");
      } else if (window.location.hash) {
        loadPostFromHash();
      } else {
        toggleView();
      }
    });

    addEventListener("posts-loaded", onPostsLoaded);
  }

  /**
   * Querys the firebase backend for all documents in the posts collection,
   * stores them to localStorage and broadcasts a "posts-loaded" event.
   */
  async function loadPosts() {
    loadCollection("posts");
    window.dispatchEvent(new Event("posts-loaded"));
  }

  /**
   * Helper function for hiding the loader, populating the blog list and 
   * loading from hash given the global blogPosts variable contains data.
   */
  function onPostsLoaded() {
    console.log("Populating with loaded posts...");
    const loader = document.getElementById("blog-loader");
    loader.classList.add("hidden");

    populateBlogList(blogPosts);
    loadPostFromHash();
  }

  /**
   * Takes a list of post objects, of the form described below, and
   * creates from the template in the html a node for each of them.
   * @param {Post[]} posts 
   */
  function populateBlogList(posts) {
    const container = document.querySelector(".blog-list-wrap");
    const post_template = document.getElementById("blog-post-item");
    const elements = [];

    for (let i = 0; i < posts.length; i++) {
      const post = /** @type {HTMLElement} */ (post_template.cloneNode(true));
      post.classList.add("blog-post"); // So they can be removed on refresh
      post.classList.remove("hidden");
      post.id = "";

      const wrapper = post.querySelector(".blog-summary-wrap");
      addAccessibleClickListener(wrapper, () => {
        window.location.hash = getHashForPost(post, i);
      });

      // Fill out the title, date and content
      post.querySelector(".blog-item-title").innerHTML = posts[i].title;
      post.querySelector(".blog-item-date").innerHTML = formatDate(posts[i].date);
      post.querySelector(".blog-item-summary").innerHTML = (posts[i].blurb) ? posts[i].blurb : posts[i].body;

      container.appendChild(post);
      elements.push(post);
    }

    addAnimationObserver(elements);
  }

  function clearBlogListOfPosts() {
    const posts = document.querySelectorAll(".blog-post");
    posts.forEach(post => post.remove());
  }

  function showBlogPost(post) {
    toggleView();
    document.getElementById("blog-post-title").innerHTML = post.title;
    document.getElementById("blog-post-date").innerHTML = formatDate(post.date);
    document.getElementById("blog-post-body").innerHTML = post.body;
    // @ts-expect-error It is an HTML element with an href.
    document.getElementById("blog-post-link").href = post.link;
  }

  function showBlogList() {
    toggleView();
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  function toggleView() {
    if (scrollDist !== undefined) {
      scrollToWithDelay(scrollDist, "smooth");
      scrollDist = undefined;
    } else {
      scrollDist = window.scrollY;
      scrollToWithDelay(0, "smooth");
    }

    document.getElementById("blog-items-list").classList.toggle("hidden");
    document.getElementById("blog-post").classList.toggle("hidden");
  }

  /**
   * In firefox there is a bug and scrolling immediately after modifying
   * the dom (in a way that affects document height) won't work.
   * 
   * @param {number} scrollY 
   * @param {"smooth" | "instant"} scrollBehavior 
   */
  function scrollToWithDelay(scrollY, scrollBehavior) {
    scrollBehavior = scrollBehavior || "instant";
    setTimeout(() => {
      window.scrollTo({ top: scrollY, behavior: scrollBehavior });
    }, 1);
  }

  /**
   * Adds the given function as both a click event listener 
   * and a keydown event listener for accessiblity reasons.
   * @param {Element} elem 
   * @param {(event: KeyboardEvent) => void} func 
   */
  function addAccessibleClickListener(elem, func) {
    elem.addEventListener("click", func);
    elem.addEventListener("keydown", (/** @type {KeyboardEvent} */ event) => {
      if (event.key === "Enter") func(event);
    });
  }

  function loadPostFromHash() {
    if (!blogPosts) return;
    const post = getPostFromHash(window.location.hash);

    if (post) {
      showBlogPost(post);
      if (scrollDist === undefined) scrollDist = 0;
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
    const hashRegex = /#article-[0-9]$/;
    if (!hashRegex.test(hash)) return;

    const index = parseInt(hash.replace(/\D/g, ""));
    return blogPosts[index - 1];
  }

})();
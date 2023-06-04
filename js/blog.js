import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

"use strict";
(function () {

  // GLOBAL VARIABLES
  window.addEventListener("load", init);
  var blogPosts = null;
  var scrollDist = 0;

  // PRE INIT SETUP
  const firebaseConfig = {
    apiKey: "AIzaSyDtv_mjLaZQImF4KoKy6s-moer6TtOVJiI",
    authDomain: "geosmart-uw.firebaseapp.com",
    projectId: "geosmart-uw",
    storageBucket: "geosmart-uw.appspot.com",
    messagingSenderId: "244030791746",
    appId: "1:244030791746:web:f6c34ef4b145ab7d1a8ddb",
    measurementId: "G-9L9TCCS7HD"
  };
  const app = initializeApp(firebaseConfig);

  const cachedPosts = localStorage.getItem("cachedPosts");
  if (cachedPosts) {
    blogPosts = JSON.parse(cachedPosts);
    console.log(`Loaded ${blogPosts.length} cached posts.`);

    // We don't want cached posts to last forever
    const cachedTime = localStorage.getItem("cachedTime");
    if (cachedTime && timeDifferenceInHours(new Date(cachedTime)) > 1) localStorage.clear();
  } else loadPosts();

  // This function handles everything that needs to occur after the window
  // has fully loaded, meaning in this case event listeners.
  function init() {
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

    // It is possible that the window will load first or the posts. Likely it will
    // be the window, so we have an event listener to wait for the posts loading, but 
    // it is not consistent. Also, blogPosts will be loaded already if they were cached.
    if (blogPosts) {
      onPostsLoaded();
    }
    addEventListener("posts-loaded", onPostsLoaded);
  }

  // Querys the firebase backend for all documents in the posts collection,
  // stores them to local storage and broadcasts a "posts-loaded" event.
  async function loadPosts() {
    console.log("Loading posts from server...");
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data()); // doc.data() is never undefined for query doc snapshots
    });
    posts.reverse();
    blogPosts = posts;

    localStorage.setItem("cachedPosts", JSON.stringify(posts));
    localStorage.setItem("cachedTime", new Date().toISOString());
    window.dispatchEvent(new Event("posts-loaded"));
    console.log(`Loaded ${blogPosts.length} posts from server.`);
  }

  // Helper function for hiding the loader, populating the blog list and 
  // loading from hash given the global blogPosts variable contains data.
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
   * Interface "post" format:
   * {
   *    title: string
   *    body: string
   *    link: string
   *    blurb?: string
   *    date: { number, number }
   * }
   * @param {post[]} posts 
   */
  function populateBlogList(posts) {
    const container = document.querySelector(".blog-list-wrap");
    const post_template = document.getElementById("blog-post-item");
    const elements = [];

    for (let i = 0; i < posts.length; i++) {
      const post = post_template.cloneNode(true);
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
    document.getElementById("blog-post-link").href = post.link;
  }

  function showBlogList() {
    toggleView();
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  function toggleView() {
    if (scrollDist) {
      scrollToWithDelay(scrollDist, "smooth");
      scrollDist = 0;
    } else {
      scrollDist = window.scrollY;
      scrollToWithDelay(0);
    }

    document.getElementById("blog-items-list").classList.toggle("hidden");
    document.getElementById("blog-post").classList.toggle("hidden");
  }

  // In firefox there is a bug and scrolling immediately after modifying
  // the dom (in a way that affects document height) won't work.
  function scrollToWithDelay(scrollY, scrollBehavior) {
    scrollBehavior = scrollBehavior || "instant";
    setTimeout(() => {
      window.scrollTo({ top: scrollY, behavior: scrollBehavior });
    }, 1);
  }

  // Creates an intersection observer which triggers animations for
  // some elements when they scroll onto the page by modifying their class.
  function addAnimationObserver(animated_items) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.45
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pre-anim");
        }
      })
    }, options);

    animated_items.forEach((element) => observer.observe(element));
  }

  // Adds the given function as both a click event listener
  // and a keydown event listener for accessiblity reasons.
  function addAccessibleClickListener(elem, func) {
    elem.addEventListener("click", func);
    elem.addEventListener("keydown", function (event) {
      if (event.key === "Enter") func(event);
    });
  }

  function loadPostFromHash() {
    if (!blogPosts) return;
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
    const hashRegex = /#article-[0-9]$/;
    if (!hashRegex.test(hash)) return;

    const index = parseInt(hash.replace(/\D/g, ""));
    return blogPosts[index - 1];
  }

  function formatDate(dateObj) {
    const { seconds, nanoseconds } = dateObj;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    return formattedDate;
  }

  function timeDifferenceInHours(date) {
    var currentTime = new Date();  // Get the current date and time
    var timeDifference = currentTime.getTime() - date.getTime();  // Calculate the time difference in milliseconds
    return timeDifference / (1000 * 60 * 60);  // Convert milliseconds to hours
  }

})();
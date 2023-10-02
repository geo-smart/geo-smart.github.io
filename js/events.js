import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { db } from "./firebase.js";

"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Initialization function that should handle anything that needs to occur
   * on page load (include changing from one page to another).
   */
  function init() {
    setUpToastContent();
    setUpToastOnClick();
  }

  function setUpToastOnClick() {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.addEventListener("click", (evt) => {
      evt.preventDefault();
      toast.classList.add("hide");
      setTimeout(() => {
        const link = toast.getAttribute("href");
        window.open(link, "_blank");
      }, 500); // match to toast hide animation
    });
  }

  async function getEventContent() {
    console.log("Loading event from server...");
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

})();
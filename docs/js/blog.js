"use strict";!function(){window.addEventListener("load",(function(){l(document.getElementById("blog-post-return"),o);const t=document.querySelector(".blog-list-wrap"),i=document.getElementById("blog-post-item");for(let e=0;e<posts.length;e++){const o=i.cloneNode(!0);o.classList.remove("hidden");l(o.querySelector(".blog-summary-wrap"),(()=>{window.location.hash=s(o,e)})),o.querySelector(".blog-item-title").innerHTML=posts[e].title,o.querySelector(".blog-item-date").innerHTML=posts[e].date,o.querySelector(".blog-item-summary").innerHTML=posts[e].blurb?posts[e].blurb:posts[e].body,t.appendChild(o)}if(addEventListener("popstate",(()=>{if(window.location.hash){e(d(window.location.hash))}else n()})),window.location.hash){e(d(window.location.hash))}}));var t=0;function e(t){n(),document.getElementById("blog-post-title").innerHTML=t.title,document.getElementById("blog-post-date").innerHTML=t.date,document.getElementById("blog-post-body").innerHTML=t.body,document.getElementById("blog-post-link").href=t.link}function o(){n(),history.pushState("",document.title,window.location.pathname+window.location.search)}function n(){t?(i(t,"smooth"),t=0):(t=window.scrollY,i(0)),document.getElementById("blog-items-list").classList.toggle("hidden"),document.getElementById("blog-post").classList.toggle("hidden")}function i(t,e){e=e||"instant",setTimeout((()=>{window.scrollTo({top:t,behavior:e})}),1)}function l(t,e){t.addEventListener("click",e),t.addEventListener("keydown",(function(t){"Enter"===t.key&&e(t)}))}function s(t,e){return`article-${(e=void 0!==e?e:posts.findIndex((e=>{e.title,t.title,e.date,t.date,e.body,t.body,e.link,t.link})))+1}`}function d(t){const e=parseInt(t.replace(/\D/g,""));return posts[e-1]}}();
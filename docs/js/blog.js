"use strict";!function(){function e(e){t();const o=e.currentTarget.post;document.getElementById("blog-post-title").innerHTML=o.title,document.getElementById("blog-post-date").innerHTML=o.date,document.getElementById("blog-post-body").innerHTML=o.body,document.getElementById("blog-post-link").href=o.link}function t(){document.getElementById("blog-items-list").classList.toggle("hidden"),document.getElementById("blog-post").classList.toggle("hidden"),window.scrollTo({top:"0",behavior:"smooth"})}window.addEventListener("load",(function(){document.getElementById("blog-post-return").addEventListener("click",t);const o=document.querySelector(".blog-list-wrap"),n=document.getElementById("blog-post-item");for(let t=0;t<posts.length;t++){const l=n.cloneNode(!0);l.classList.remove("hidden"),l.addEventListener("click",e),l.post=posts[t],l.querySelector("#blog-item-title").innerHTML=posts[t].title,l.querySelector("#blog-item-date").innerHTML=posts[t].date,l.querySelector("#blog-item-summary").innerHTML=posts[t].blurb?posts[t].blurb:posts[t].body,o.appendChild(l)}}))}();
"use strict";!function(){function e(){const e=document.querySelector(".w-nav-overlay");window.innerWidth>1150?e.classList.add("hidden"):e.classList.remove("hidden")}function t(e,t){const n=document.createElement("a");return n.classList.add("page-nav-item"),n.setAttribute("href",e),n.style.setProperty("--label",t),n}window.addEventListener("load",(function(){(function(e){const t=/\/[a-zA-Z0-9]+$/;let n=e.match(t);if(n){n=n[0];const e=n.substring(1).toLowerCase(),t=document.querySelectorAll(".navigation-item");for(let n=0;n<t.length;n++){t[n].innerHTML.toLowerCase().replace(/\s/g,"")===e?t[n].classList.add("w--current"):t[n].classList.remove("w--current")}}})(document.URL),function(){const e=document.querySelectorAll(".page-nav-section-marker"),n=document.getElementById("page-navigation");if(e.length>0){n.classList.remove("hidden");const o=t("#scroll-top",'"Page Top"');o.classList.add("section-shown"),n.appendChild(o);for(let o=0;o<e.length;o++){const s=t("#"+e[o].id,'"'+e[o].id.replace(/_/g," ")+'"');n.appendChild(s)}const s=document.querySelectorAll(".page-nav-item"),i=-45;for(let e=0;e<s.length;e++)s[e].addEventListener("click",(t=>{const n=s[e].getAttribute("href").substring(1),o=document.getElementById(n).getBoundingClientRect().top+window.pageYOffset+i;window.scrollTo({top:o,behavior:"smooth"}),t.preventDefault()}));window.addEventListener("scroll",(function(){let t=0;for(let n=1;n<s.length;n++){const o=e[n-1];s[n].classList.remove("section-shown"),window.scrollY>o.offsetTop+1.5*i&&(t=n)}s[0].classList.remove("section-shown"),s[t].classList.add("section-shown")}))}}();const n=document.getElementById("menu-button"),o=document.getElementById("w-nav-overlay-0");n.addEventListener("click",(()=>{o.classList.toggle("invisible")})),window.addEventListener("resize",e);document.getElementById("scroll-top-button").addEventListener("click",(e=>{window.scrollTo({top:"0",behavior:"smooth"}),e.preventDefault()}))}))}();
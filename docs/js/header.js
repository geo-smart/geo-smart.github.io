const content='<div id="scroll-top" data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navigation w-nav"><div class="navigation-wrap"><a href="/" class="logo-link w-nav-brand" tabindex="1"><img src="assets/GeoSMART_logo.svg" width="200" alt="" class="logo-image" /></a><div class="menu"><nav role="navigation" class="navigation-items w-nav-menu"><a href="/curriculum" class="navigation-item w-nav-link">CURRICULUM</a><a href="/usecases" class="navigation-item w-nav-link">USE CASES</a><a href="/codeweek" class="navigation-item w-nav-link">CODEWEEK</a><a href="/tools" class="navigation-item w-nav-link">TOOLS</a><a href="/news" class="navigation-item w-nav-link">NEWS</a><div class="navigation-item w-nav-link dropdown">ABOUT US <div class="dropdown-body"><a href="/motivation" class="navigation-item w-nav-link">MOTIVATION</a><a href="/team" class="navigation-item w-nav-link">TEAM</a><a href="/book" class="navigation-item w-nav-link">BOOK</a></div></div></nav><div class="menu-button w-nav-button" style="-webkit-user-select: text;" tabindex="0" id="menu-button" aria-label="menu" role="button" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="true"><img src="assets/img/mobile_menu.png" width="22" alt="" class="menu-icon" /></div></div><a href="/getinvolved" class="button cc-contact-us w-inline-block"><div class="button-background"></div><div class="button-fill"></div><span class="color-text">GET&nbsp;INVOLVED</span></a></div><div class="w-nav-overlay invisible" data-wf-ignore="" id="w-nav-overlay-0" style="height: 100vh; display: block;"><nav role="navigation" class="navigation-items w-nav-menu" data-nav-menu-open=""><a href="/curriculum" class="navigation-item w-nav-link w--nav-link-open">CURRICULUM</a><a href="/usecases" class="navigation-item w-nav-link w--nav-link-open">USE CASES</a><a href="/codeweek" class="navigation-item w-nav-link w--nav-link-open">CODEWEEK</a><a href="/tools" class="navigation-item w-nav-link w--nav-link-open">TOOLS</a><a href="/news" class="navigation-item w-nav-link w--nav-link-open">NEWS</a><a href="/motivation" class="navigation-item w-nav-link w--nav-link-open">MOTIVATION</a><a href="/team" class="navigation-item w-nav-link w--nav-link-open">TEAM</a><a href="/book" class="navigation-item w-nav-link w--nav-link-open">BOOK</a><a href="/getinvolved" class="navigation-item w-nav-link w--nav-link-open">GET INVOLVED</a></nav></div></div>',doc=(new DOMParser).parseFromString(content,"text/html"),header=doc.querySelector("body").firstChild,replace=document.querySelector("script#replace_with_header");replace.parentNode.replaceChild(header,replace);
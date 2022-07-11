fetch('header.html')
  .then(res => res.text())
  .then(text => {
    const replace = document.querySelector("script#replace_with_header");
    const header = document.createElement("div");
    header.innerHTML = text;
    replace.parentNode.replaceChild(header, replace);
  });
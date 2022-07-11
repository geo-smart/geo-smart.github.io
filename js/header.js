const content = "<!-- HEADER -->\n" +
  "<div id=\"scroll-top\" data-collapse=\"medium\" data-animation=\"default\" data-duration=\"400\" data-easing=\"ease\" data-easing2=\"ease\"\n" +
  "     role=\"banner\" class=\"navigation w-nav\">\n" +
  "  <div class=\"navigation-wrap\"><a href=\"index.html\" aria-current=\"page\" class=\"logo-link w-nav-brand w--current\"><img\n" +
  "    src=\"assets/GeoSMART_logo.svg\"\n" +
  "    width=\"200\" alt=\"\" class=\"logo-image\"/></a>\n" +
  "    <div class=\"menu\">\n" +
  "      <nav role=\"navigation\" class=\"navigation-items w-nav-menu\">\n" +
  "        <a href=\"curriculum.html\" class=\"navigation-item w-nav-link\">CURRICULUM</a>\n" +
  "        <a href=\"codeweek.html\" class=\"navigation-item w-nav-link\">CODEWEEK</a>\n" +
  "        <a href=\"tools.html\" class=\"navigation-item w-nav-link\">TOOLS</a>\n" +
  "        <a href=\"motivation.html\" class=\"navigation-item w-nav-link\">MOTIVATION</a>\n" +
  "        <a href=\"team.html\" class=\"navigation-item w-nav-link\">TEAM</a>\n" +
  "        <a href=\"news.html\" class=\"navigation-item w-nav-link\">NEWS</a>\n" +
  "      </nav>\n" +
  "      <div class=\"menu-button w-nav-button\" style=\"-webkit-user-select: text;\" tabindex=\"0\" id=\"menu-button\"\n" +
  "           aria-label=\"menu\" role=\"button\" aria-controls=\"w-nav-overlay-0\" aria-haspopup=\"menu\" aria-expanded=\"true\">\n" +
  "        <img\n" +
  "          src=\"assets/img/mobile_menu.png\"\n" +
  "          width=\"22\" alt=\"\" class=\"menu-icon\"/>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "    <a href=\"contact.html\" class=\"button cc-contact-us w-inline-block\">\n" +
  "      <div>GET INVOLVED</div>\n" +
  "    </a>\n" +
  "  </div>\n" +
  "  <div class=\"w-nav-overlay invisible\" data-wf-ignore=\"\" id=\"w-nav-overlay-0\" style=\"height: 100vh; display: block;\">\n" +
  "    <nav role=\"navigation\" class=\"navigation-items w-nav-menu\" data-nav-menu-open=\"\">\n" +
  "      <a href=\"curriculum.html\" class=\"navigation-item w-nav-link w--nav-link-open\">CURRICULUM</a>\n" +
  "      <a href=\"codeweek.html\" class=\"navigation-item w-nav-link w--nav-link-open\">CODEWEEK</a>\n" +
  "      <a href=\"tools.html\" class=\"navigation-item w-nav-link w--nav-link-open\">TOOLS</a>\n" +
  "      <a href=\"motivation.html\" class=\"navigation-item w-nav-link w--nav-link-open\">MOTIVATION</a>\n" +
  "      <a href=\"team.html\" class=\"navigation-item w-nav-link w--nav-link-open\">TEAM</a>\n" +
  "      <a href=\"news.html\" class=\"navigation-item w-nav-link w--nav-link-open\">NEWS</a>\n" +
  "    </nav>\n" +
  "  </div>\n" +
  "</div>\n" +
  "<!-- END HEADER -->";

const replace = document.querySelector("script#replace_with_header");
const header = document.createElement("div");
header.innerHTML = content;
replace.parentNode.replaceChild(header, replace);
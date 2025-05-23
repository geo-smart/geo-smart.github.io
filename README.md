<h1>
  <img src="assets/apple_touch_icon.png" style="height: 1em; margin-bottom: -0.1em;"/>
  GeoSMART
</h1>

Site live at https://geo-smart.github.io/.

## Adding Blog Posts

To add blog posts, please refer to the site dashboard, found [here](https://github.com/geo-smart/site-dashboard). This process does not require technical know-how, but does require an account. More information can be found at the link above.

## Development Instructions

### Quickstart

```bash
cd build
npm i
cd ..
node build/build.js
python server.py
```

### Overview

The geosmart site is a simple multi-page static HTML website. There is very little complexity to the site, with the most noteworthy parts from a development perspective being the blog posts, page navigation and header. Below is the tech stack used:

* Vanilla JavaScript, HTML, CSS
* Firebase
* Python (local management scripts)
* Node.js (local management scripts)

The Node.js script has the following dependencies:

* fs-extra
* minify
* try-to-catch

### Project Structure

The site is hosted with github pages, and interfaces with a firebase project. More information about the backend can be found in the firebase section.

The root of the github pages site is in the `docs` folder. The files inside of the `docs` folder should just be a minified version of those outside the `docs` folder. You should never need to make manual edits to any files inside the `docs` directory, which should be managed entirely with the provided Python and Node.js scripts.

### Firebase Backend

Blog posts for the `news.html` page are stored in a cloud firestore collection. Read operations do not require permissions, so the geosmart site simply uses the CDN setup (on the news page only) and reads the entire `posts` collection. 

### Running Locally

The way the navigation of the site works is structured in a way that necessitates changing how one tests the site locally. Since the `<a>` links that manage site navigation no longer include `.html` extensions, simply opening `index.html` with your browser will not accurately mimic the end user experience.

Instead, run `python server.py` from the root directory, or include the `--docs` flag if testing the production version of the site. Alternatively one can also run `python ../server.py` from the `docs` directory to test the production version of the site, since the server operates on relative paths. What is important is to be aware that which folder the server is run from matters. Then, navigate to http://localhost:8000/ to view the website.

The `server.py` code runs with python's `http.server` module and uses a modified version of `SimpleHTTPRequestHandler` in order to handle `<a>` links not including `.html` extensions. It also has a second optional flag, `--watch`, which watches the `_header.html` file for changes. If it detects any, it runs `build/inject.py` allowing for easier development of the header. This flag is mutually exclusive with `--docs`.

### Making Changes

When you have made changes to files outside the `docs` folder, to see those changes reflected on the actual site (in the `docs` folder) you must run `build.js`. Open a cmd prompt to the `build` directory and type `node build.js`. This should update the contents of `docs` to mirror the site files outside of `docs`, except minified.

Make sure you *DO NOT* run `build.js` from any directory other than the `build` or root directory! The script works relative to project structure and will maybe be thrown off if run from a different directory. It is also best to run the server from the root directory.

```
node build/build.js
python server.py
```

Note that `build.js` may need to be modified if you change the structure of the site. All of the following files are are automatically copied to `docs`: 

* All files inside the `assets` folder
* All `.html` files in the root folder
* All `.css` files in the `css` folder
* All `.js` files in the `js` folder

The only exception to note is that files whose names start with an underscore are ignored, other than files in `assets`. Also, the build script will automatically minify all the `html`, `css`, and `js` files it finds when copying them to the  `docs` folder. 

#### `Page Headers`

To change the header, edit `_header.html`. Then, when running `server.py`, the changes to `_header.html` will automatically be detected and `inject.py` will be run.

This script automatically inserts the HTML data from `_header.html` into each page with the follow header tag.

```html
<!-- %START HEADER -->
<!-- %END HEADER -->
```

On pages with the header, you will see the HTML contents of `_header.html` enclosed between these tags. The `inject.py` script automatically replaces anything between these tags, so know that changes to anything between the tags will not be saved.

To add the header to a new page, simply include the tags. There does not need to be anything between them.

#### `Page Navigation`

The page navigation side bar is built based on any elements with class `page-nav-section-marker` on the page. These should typically be the div or section containers as opposed to the headers. 

To add a section to the page navigation, give it the class `page-nav-section-marker` and an id representing the name except with underscores substituted for whitespace. For instance, if you want the node on the page navigation menu to read "Help Section" then the id should read "Help_Section". Once you have marked all sections with the appropriate class and given each an id, add HTML below to the page before any content. The page navigation should be before any page content to ensure that it comes before page content in the tabbing order.

```html
<!-- %START NAVIGATION -->
<!-- %END NAVIGATION -->
```

Adding these tags will insert the navigation component found in `_navigation.html` to the page when `server.py` is run.

### Keep in Mind

The `head` of each page is (almost) the same on every page. If you change it somewhere, you should probably change it everywhere.

What you should change about the `head` from page to page is the title, while the footer is identical on each page.

## TODO

Change refresh functionality on the news page to only remove/replace cached posts if new posts are successfully loaded from the server.

***

Try entire site with screen reader to check for accessibility issues. Many elements will likely be missing `aria-label`s.

***

At some point the way news/blog posts are done, namely through `blog.js` and the firebase backend could be improved. The way the post body is stored could be changed so that it can be formatted, or posts could include media like images. As most posts are currently just short blurbs that link to a full article somewhere else, it is currently unnecessary, but this may change.

Another potential improvement for the news page would be to store some persistent state with cookies (like whether articles have been read or not). The page merely uses cookies to determine whether to refresh posts from the firebase server or not.

***

Because of the way the scroll based animations work (they use the `IntersectionObserver` API) the site is broken for users who do not have JavaScript enabled. Some refactoring could fix this, although it is a very small portion of web users.

One potentially fix would be to give all animated elements a marker class, then onload to give each of these elements their pre-animation state via class, and then have the IntersectionObserver work like normal, removing the pre-animation class when they are on screen. The problem is this could mean certain elements briefly flash on first page load, but an animation for the entire body could alleviate this issue.

***

Build out full notifications system using similar infrastructure to the blogging system and the basic toast implemented on the codeweek page.
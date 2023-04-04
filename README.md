# GeoSMART

Site live at https://geo-smart.github.io/

## Adding Blog Posts

Inside the `post` folder, see `posts.js`. This file contains a `const` that is a list of javascript objects. In order to add a blog post, add a javascript object to this list containing the post's information. More detailed instructions can be found in the comment at the top of the `posts.js` file itself, including a template to copy and paste.

## Adding & Modifying Page Navigation

The page navigation side bar is built based on any elements with class `page-nav-section-marker` on the page. These should typically be the div or section containers as opposed to the headers. To add a section to the page navigation, give it the class `page-nav-section-marker` and an id representing the name except with underscores substituted for whitespace. For instance, if you want the node on the page navigation menu to read "Help Section" then the id should read "Help_Section". Once you have marked all sections with the appropriate class and given each an id, add the following html to the page just above the footer:

```html
<!-- PAGE NAVIGATION -->
<div id="page-navigation" class="hidden">
  <div class="page-nav-bar"></div>
</div>
<!-- ENG PAGE NAVIGATION -->
```

## Development Instructions

### Running the Site Locally

The way the navigation of the site works is structured in a way that necessitates changing how one tests the site locally. Since the `<a>` links that manage site navigation no longer include `.html` extensions, simply opening `index.html` with your browser will not accurately mimic the end user experience.

Instead, run `python server.py` from the root directory, or include the `--docs` flag if testing the production version of the site. Alternatively one can also run `python ../server.py` from the `docs` directory to test the production version of the site, since the server operates on relative paths. What is important is to be aware that which folder the server is run from matters. Then, navigate to http://localhost:8000/ to view the website.

The `server.py` code runs with python's `http.server` module and uses a modified version of `SimpleHTTPRequestHandler` in order to handle `<a>` links not including `.html` extensions. It also has a second optional flag, `--watch`, which watches the `header.html` file for changes. If it detects any, it runs `build/header.py` allowing for easier development of the header. This flag is mutually exclusive with `--docs`.

### Project Structure

The root of the github pages site is in the `docs` folder. The files inside of the `docs` folder should just be a minified version of those outside the `docs` folder.

### Making Changes

When you have made changes to files outside the `docs` folder, to see those changes reflected on the actual site (in the `docs` folder) you must run `build.js`. Open a cmd prompt to the `build` directory and type `node build.js`. This should update the contents of `docs` to mirror the site files outside of `docs`, except minified. The easiest and safest way to do this would be to just delete all the contents of the docs folder before you build.

Make sure you *DO NOT* run `build.js` from any directory other than the `build` or root directory! The script works relative to project structure and will maybe be thrown off if run from a different directory.

Note that `build.js` may need to be modified if you change the structure of the site, add files, or remove files. The exception to this is if you add files to the `assets` folder, as all of the contents of this folder are automatically copied to `docs`. The build script will automatically minify and copy all the `html` and `js` files it knows about to the  `docs` folder. The ONLY changes you should have to do manually would be to add the path names of any new files you add (.html or .js) to the list called `files` in `build.js`, or to remove their paths if you remove them from the site (make sure to remove them from `docs` too, which can be most simply acheived by deleting all contents on site build).

To change the header, edit `header.html`, then run `header.py`. This will modify the header string in `header.js`. This will automatically affect every page on the site, since the `header.js` script automatically replaces itself on page load. Unlike `build.js`, you can run `header.py` from the root folder or the `build` folder. It can also run silently via the `--silent` flag.

### TODO

At some point the `build.js` script needs to be improved. As of now, it basically is just a bunch of hard coded calls to the `minify` npm package. If `js` or `html` files are added to the site structure, have their names refactored, or anything of that sort is changed, `build.js` will at best miss the changes and at worst break the `docs` version of the site in some way. A small update to make before then would be to add a `--full` flag so that the entirety of the docs folder is deleted and build based on site contents. At the moment, removed assets still persist in the `docs` version of the site, for instance.

Unlike the header, the footer on each page has not been factored out into a separate file from where it can be modified. It is not a priority since it probably won't be modified often, but something to keep in mind.

Finally, at some point the way news/blog posts are done, namely through `blog.js` and `posts.js`, could be improved. There is definitely a better way to store and edit posts than in javascript, and the way the post body is stored could be changed so that it can be formatted. As most posts are currently just short blurbs that link to a full article somewhere else, it is unnecessary, but this may change.
<br><br>
Potentially, posts could be stored in some `posts.csv`, which a script then turns into a json similar to what `posts.js` currently is and then blog.js remains the same. This however does
not fix the lack of formatting. This would allow the posts to be fetched from a different location however, so that the site need not be pushed to a redeployed any time a post needs to be added.

### Keep in Mind

The `head` of each page as well as the sections labeled 'footer' are (almost) the same on every page. If you change it somewhere, you should change it everywhere.

What you should change about the `head` from page to page is the title, while the footer is identical on each page.
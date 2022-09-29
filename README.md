# GeoSMART

Site live at https://geo-smart.github.io/

## Adding Blog Posts

Inside the `post` folder, see `posts.js`. This file contains a `const` that is a list of javascript objects. In order to add a blog post, add a javascript object to this list containing the post's information. More detailed instructions can be found in the comment at the top of the `posts.js` file itself, including a template to copy and paste.

## Development Instructions

#### Project Structure

The root of the github pages site is in the `docs` folder. The files inside of the `docs` folder should just be a minified version of those outside the `docs` folder.

#### Making Changes

When you have made changes to files outside the `docs` folder, to see those changes reflected on the actual site (in the `docs` folder) you must run `production.js`. Open a cmd prompt to the `build` directory and type `node production.js`. This should update the contents of `docs` to mirror the site files outside of `docs`, except minified. The easiest and safest way to do this would be to just delete all the contents of the docs folder before you build.
<br><br>
Note that `production.js` may need to be modified if you change the structure of the site, add files, or remove files. The exception to this is if you add files to the `assets` folder, as all of the contents of this folder are automatically copied to `docs`. The build script will automatically minify and copy all the `html` and `js` files it knows about to the  `docs` folder. The ONLY changes you should have to do manually would be to add the path names of any new files you add (.html or .js) to the list called `files` in `production.js`, or to remove their paths if you remove them from the site (make sure to remove them from `docs` too, which can be most simply acheived by deleting all contents on site build).
<br><br>
To change the header, go to the `header.js` file and modify it there. This will automatically affect every page on the site, since the `header.js` script automatically replaces itself on page load.

#### TODO

At some point the `production.js` script needs to be improved. As of now, it basically is just a bunch of hard coded calls to the `minify` npm package. If `js` or `html` files are added to the site structure, have their names refactored, or anything of that sort changed, `production.js` will at best miss the changes and at worst break the `docs` version of the site in some way.

Unlike the header, the footer on each page has not been factored out into a separate file from where it can be modified. It is not a priority since it probably won't be modified often, but something to keep in mind.

Finally, at some point the way news/blog posts are done, namely through `blog.js` and `posts.js`, could be improved. There is definitely a better way to store and edit posts than in javascript, and the way the post body is stored could be changed so that it can be formatted. As most posts are currently just short blurbs that link to a full article somewhere else, it is unnecessary, but this may change.
<br><br>
Potentially, posts could be stored in some `posts.csv`, which a script then turns into a json similar to what `posts.js` currently is and then blog.js remains the same. This however does
not fix the lack of formatting.

#### Keep in Mind

The `head` of each page as well as the sections labeled 'header' and 'footer' are the same on every page. If you change it somewhere, you should change it everywhere.
# GeoSMART

Site live at https://geo-smart.github.io/geosmartsite/

## Development Instructions

#### Project Structure
The root of the github pages site is in the `docs` folder. The files inside of the `docs`
folder should just be a minified version of those outside the `docs` folder.

#### Making Changes
When you have made changes to files outside the `docs` folder, to see those changes reflected on the actual site you
must run `production.js`. Open a cmd prompt to the build directory and type `node production.js`. This should update the
contents of `docs` to mirror the site files outside of `docs`, except minified. 
<br><br>
Note that some files should not be changed. The site was built using webflow and scraped with wget, so `index.js` and
`index_b.js` are already unreadable to a human. The build script `production.js` ignores these files, do not change them.
The build script will automatically minify and copy all the `html` and `js` files to the `docs` folder. The ONLY changes
you should have to do to files in the `docs` folder are if you change or add anything to `assets` or `post` folder contents.

#### TODO
At some point the `production.js` script needs to be improved. As of now, it basically is just a bunch of hard coded
calls to the `minify` npm package. If `js` or `html` files are added to the site structure, have their names refactored,
or anything of that sort changed, `production.js` will at best miss the changes and at worst break the `docs` version of
the site in some way. It would also be nice to make it copy the `assets` and `posts` folders into `docs`.

## Adding Blog Posts

Inside the `js` folder, see `posts.js`. This file contains a `const` that is a list of javascript objects. In order to
add a blog post, add a javascript object to this list containing the post's information. More detailed instructions can
be found in the comment at the top of the `posts.js` file itself.
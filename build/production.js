import {minify} from 'minify';
import tryToCatch from 'try-to-catch';
import fse from 'fs-extra';

async function grabAndMinify(file) {
  const [error, data] = await tryToCatch(minify, file);
  if (error) {
    console.log("(!) > Error occured while minifying:\n" + error.message);
    throw new Error("FAILED");
  }
  return data;
}

function handleError(err, action) {
  if (err) {
    console.log(`(!) > Error occurred while ${action}:\n` + err.message);
    throw new Error("FAILED");
  } else {
    console.log(`(+) > Successfully finished ${action}`);
  }
}

async function main() {
  const src = '../';
  const dest = '../docs/';

  const dirs = ['js', 'css', 'post'];

  for (let i = 0; i < dirs.length; i++) {
    console.log(`\n(setup) creating empty ${dest + dirs[i]} folder`)
    if (!fse.existsSync(dest + dirs[i])){
      fse.mkdirSync(dest + dirs[i]);
    }
  }

  const files = [
    'js/blog.js', 'js/index.js', 'js/header.js', 'js/contact.js',
    'css/index.css', 'post/posts.js',
    'news.html', 'contact.html', 'index.html', 'motivation.html',
    'team.html', 'curriculum.html', 'codeweek.html', 'tools.html',
    'google6676251793b4eed2.html',
  ];

  for (let i = 0; i < files.length; i++) {
    const src_file = src + files[i];
    const dest_file = dest + files[i];
    console.log(`\n(copy & minify) ${src_file} --> ${dest_file}\n`);
    const mini = await grabAndMinify(src_file);
    fse.writeFile(dest_file, mini, (err) => {
      handleError(err, `writing to ${dest_file}`);
    });
  }

  console.log(`\n(recursive copy) ${src + 'assets'} --> ${dest + 'assets'}\n`);
  fse.copySync(src + 'assets', dest + 'assets', {overwrite: true},
    (err) => {
      handleError(err, `copying to ${dest_file}`);
  });
}

console.log("\n>>> Starting minification of GeoSMART site...");
main();
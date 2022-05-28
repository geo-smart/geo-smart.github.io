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

  const files = [
    'js/blog.js', 'css/index.css', 'post/posts.js',
    'blog.html', 'contact.html', 'index.html', 'motivation.html', 'team.html',
    'work/materials.html', 'work/curriculum.html', 'work/codeweek.html',
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
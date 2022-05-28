import {minify} from 'minify';
import tryToCatch from 'try-to-catch';
import * as fs from 'fs';

async function grabAndMinify(file) {
  const [error, data] = await tryToCatch(minify, file);
  if (error) {
    console.log("(!) > Error occured while minifying:\n" + error.message);
    throw new Error("FAILED");
  }
  return data;
}

function handleError(err) {
  if (err) {
    console.log("(!) > Error occured while writing:\n" + err.message);
    throw new Error("FAILED");
  } else {
    console.log('> Successfully wrote to docs/blog.js');
  }
}

async function main() {
  // JS FOLDER JAVSCRIPT FILES
  console.log("\n(./js/) > (./docs/js/)");
  console.log("> Grabbing and minifying blog.js");
  const blog_js = await grabAndMinify('../js/blog.js');
  fs.writeFile('../docs/js/blog.js', blog_js, handleError);

  // CSS FOLDER CSS FILES
  console.log("\n(./css/) > (./docs/css/)");
  console.log("> Grabbing and minifying index.css");
  const css = await grabAndMinify('../css/index.css');
  fs.writeFile('../docs/css/index.css', css, handleError);

  // ROOT FOLDER HTML FILES
  console.log("\n(./) > (./docs/)");
  console.log("> Grabbing and minifying blog.html");
  const blog = await grabAndMinify('../blog.html');
  fs.writeFile('../docs/blog.html', blog, handleError);

  console.log("> Grabbing and minifying contact.html");
  const contact = await grabAndMinify('../contact.html');
  fs.writeFile('../docs/contact.html', contact, handleError);

  console.log("> Grabbing and minifying index.html");
  const index = await grabAndMinify('../index.html');
  fs.writeFile('../docs/index.html', index, handleError);

  console.log("> Grabbing and minifying motivation.html");
  const motivation = await grabAndMinify('../motivation.html');
  fs.writeFile('../docs/motivation.html', motivation, handleError);

  console.log("> Grabbing and minifying team.html");
  const team = await grabAndMinify('../team.html');
  fs.writeFile('../docs/team.html', team, handleError);

  // WORK FOLDER HTML FILES
  console.log("\n(./work/) > (./docs/work/)");
  console.log("> Grabbing and minifying materials.html");
  const materials = await grabAndMinify('../work/materials.html');
  fs.writeFile('../docs/work/materials.html', materials, handleError);

  console.log("> Grabbing and minifying curriculum.html");
  const curriculum = await grabAndMinify('../work/curriculum.html');
  fs.writeFile('../docs/work/curriculum.html', curriculum, handleError);

  console.log("> Grabbing and minifying codeweek.html");
  const codeweek = await grabAndMinify('../work/codeweek.html');
  fs.writeFile('../docs/work/codeweek.html', codeweek, handleError);
}

console.log("\n>>> Starting minification of GeoSMART site...");
main();
import {minify} from 'minify';
import tryToCatch from 'try-to-catch';
import fse from 'fs-extra';
import path from 'path';

function getFilesWithExtension(directoryPath, targetExtension, ignoreUnderscored) {
  // Check if the directory exists
  if (!fse.existsSync(directoryPath)) {
    console.log(`(!) > Directory "${directoryPath}" does not exist!`);
    throw new Error("FAILED");
  }

  // Read the contents of the directory
  const files = fse.readdirSync(directoryPath);

  // Filter files by the extension
  const filtered = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    if (ignoreUnderscored && file.startsWith('_')) return false;
    return ext === targetExtension.toLowerCase();
  });

  const result = filtered.map(file => directoryPath + file);
  return result;
}

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
  let src = './';
  let dest = './docs/';
  
  if (process.cwd().includes("build")) {
    src = '../';
    dest = '../docs/';
  }

  console.log(`(setup) clearing ${dest} folder and contents`);
  fse.rmSync(dest, { recursive: true, force: true });
  fse.mkdirSync(dest);
  
  const dirs = ['js', 'css'];
  for (let i = 0; i < dirs.length; i++) {
    console.log(`\n(setup) creating empty ${dest + dirs[i]} folder`)
    if (!fse.existsSync(dest + dirs[i])){
      fse.mkdirSync(dest + dirs[i]);
    }
  }

  const htmlFiles = getFilesWithExtension(src, ".html", true);
  const cssFiles = getFilesWithExtension(src + "css/", ".css");
  const jsFiles = getFilesWithExtension(src + "js/", ".js");

  const files = [...htmlFiles, ...cssFiles, ...jsFiles];
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
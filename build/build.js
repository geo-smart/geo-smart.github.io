import { minify } from 'minify';
import tryToCatch from 'try-to-catch';
import fse from 'fs-extra';
import path from 'path';

function getFilesWithExtension(root, directory, extension, ignoreUnderscored) {
  const target = root + directory;
  if (!fse.existsSync(target)) { // Check if the directory exists
    console.log(`(error) \x1b[91mdirectory "${target}" does not exist!\x1b[0m`);
    throw new Error("FAILED");
  }

  // Read the contents of the directory
  const files = fse.readdirSync(target);

  // Filter files by the extension
  const filtered = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    if (ignoreUnderscored && file.startsWith('_')) return false;
    return ext === extension.toLowerCase();
  });


  const result = filtered.map(file => directory + file);
  return result;
}

async function calculateFileSize(fileList) {
  try {
    let totalSize = 0;

    for (const filePath of fileList) {
      const stats = await fse.stat(filePath);

      if (stats.isFile()) {
        totalSize += stats.size;
      }
    }

    return totalSize;
  } catch (error) {
    console.log("(error) \x1b[91mfailed while calculating size:\x1b[0m\n" + error.message);
    throw new Error("FAILED");
  }
}

async function grabAndMinify(file) {
  const options = {
    img: {
      maxSize: 0,
    },
  };

  const [error, data] = await tryToCatch(minify, file, options);
  if (error) {
    console.log("(error) \x1b[91merror occured while minifying:\x1b[0m\n" + error.message);
    throw new Error("FAILED");
  }
  return data;
}

async function main() {
  let src = "./";
  let dest = "./docs/";

  if (process.cwd().includes("build")) {
    src = "../";
    dest = "../docs/";
  }
  
  const htmlFiles = getFilesWithExtension(src, "", ".html", true);
  const cssFiles = getFilesWithExtension(src, "css/", ".css");
  const jsFiles = getFilesWithExtension(src, "js/", ".js");
  
  const files = [...htmlFiles, ...cssFiles, ...jsFiles];
  const srcFiles = files.map(file => src + file);
  const destFiles = files.map(file => dest + file);
  
  const prevTotal = await calculateFileSize(destFiles) / 1000;

  console.log(`(setup) clearing ${dest} folder and contents`);
  fse.rmSync(dest, { recursive: true, force: true });
  fse.mkdirSync(dest);

  const dirs = ["js", "css"];
  for (let i = 0; i < dirs.length; i++) {
    console.log(`(setup) creating empty ${dest + dirs[i]} folder`);
    if (!fse.existsSync(dest + dirs[i])) {
      fse.mkdirSync(dest + dirs[i]);
    }
  }

  for (let i = 0; i < files.length; i++) {
    const src_file = src + files[i];
    const dest_file = dest + files[i];

    const mini = await grabAndMinify(src_file);
    console.log(`\n(minify) read and minified ${src_file}`);
    fse.writeFileSync(dest_file, mini);
    console.log(`(copy) copied ${src_file} --> ${dest_file}`);
  }

  console.log(`\n(recursive copy) ${src + "assets"} --> ${dest + "assets"}`);
  fse.copySync(src + "assets", dest + "assets", { overwrite: true });

  const srcTotal = await calculateFileSize(srcFiles) / 1000;
  const destTotal = await calculateFileSize(destFiles) / 1000;

  console.log(`\n(result) raw size: \x1b[93m${srcTotal}\x1b[0m kb`);
  console.log(`(result) minified size: \x1b[93m${destTotal}\x1b[0m kb`);
  console.log(`(result) compressed by \x1b[92m${Math.round((1 - (destTotal / srcTotal)) * 100)}%\x1b[0m\n`);
  
  const sizeChange = Math.round((destTotal - prevTotal) * 100) / 100;
  console.log(`\n(result) previous size: \x1b[93m${prevTotal}\x1b[0m kb`);
  const resultColor = sizeChange > 0 ? "\x1b[91m+" : sizeChange < 0 ? "\x1b[92m" : "~";
  console.log(`(result) build size change: ${resultColor}${sizeChange}\x1b[0m kb`);
}

console.log("\n>>> Starting minification of GeoSMART site...\n");
main();
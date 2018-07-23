import path from 'path'
import fs from 'fs'
import { createFilter } from 'rollup-pluginutils'

function copy (patterns, options = {}) {
  let copied = false;
  let { watch = true } = options;
  let patterns_ = [];
  if (!Array.isArray(patterns)) {
    patterns_.push(patterns)
  } else {
    patterns_ = patterns
  }
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'copied',
    load (id) {
    },
    onwrite: function write () {
      if (!watch && copied) return;
      for (let i = 0; i < patterns_.length; i++) {
        let [absoluteFrom, absoluteTo] = ['', ''];
        let {from, to, emitFiles = true} = patterns_[i];
        if (path.isAbsolute(from)) {
          absoluteFrom = from;
        } else {
          absoluteFrom = path.resolve(from);
        }
        if (path.isAbsolute(to)) {
          absoluteTo = to;
        } else {
          absoluteTo = path.resolve(to);
        }
        // Allow skipping saving files for server side builds.
        let copies = getFileList(from);
        copies = copies.filter(_item => filter(_item));
        if (!emitFiles) continue;
        return Promise.all((copies).map(name => {
          checkFolderExist(absoluteTo, true);
          return copyFile(path.join(absoluteFrom, name), path.join(absoluteTo, name))
        }))
      }
      copied = true;
    }
  }
}

/**
 * get file list
 * @param _path
 * @returns {Array}
 */
const getFileList = _path => {
  const result = [];
  function finder (path_) {
    let files = fs.readdirSync(path_);
    files.forEach((val, index) => {
      let fPath = path.join(path_, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(val)
    })
  }
  finder(_path);
  return result
};

/**
 * check folder exist
 * @param path_
 * @param mkdir
 * @returns {boolean}
 */
const checkFolderExist = (path_, mkdir) => {
  let paths = path.normalize(path_).split(path.sep);
  let currentPath = paths[0];
  let result = true;
  for (let i = 1; i < paths.length; i++) {
    currentPath += path.sep + paths[i];
    if (!fs.existsSync(currentPath)) {
      if (mkdir) {
        fs.mkdirSync(currentPath);
      }
      result = false;
    }
  }
  return result;
};

/**
 * copy file to dir
 * @param src
 * @param dest
 * @returns {Promise<any>}
 */
function copyFile (src, dest) {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream(src);
    read.on('error', reject);
    const write = fs.createWriteStream(dest);
    write.on('error', reject);
    write.on('finish', resolve);
    read.pipe(write);
  })
}

export default copy

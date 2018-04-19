import path from 'path'
import fs from 'fs'

function copy (options = {}) {
  let [absoluteFrom, absoluteTo] = ['', '']
  let {
    from,
    to,
    emitFiles = true
  } = options;

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

  return {
    name: 'copied',
    load (id) {
    },
    onwrite: function write (options) {
      // Allow skipping saving files for server side builds.
      const copies = getFileList(from);
      if (!emitFiles) return;
      return Promise.all((copies).map(name => {
        checkFolderExist(absoluteTo, true);
        return copyFile(path.join(absoluteFrom, name), path.join(absoluteTo, name))
      }))
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
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(val)
    })
  }
  finder(_path)
  return result
};

/**
 * check folder exist
 * @param path
 * @param mkdir
 * @returns {boolean}
 */
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
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(val)
    })
  }
  finder(_path)
  return result
};

/**
 * check folder exist
 * @param path
 * @param mkdir
 * @returns {boolean}
 */
const checkFolderExist = (path, mkdir) => {
  let paths=path.normalize(path).split(path.sep)
  let currentPath=paths[0]
  let result=true
  for (let i=1;len=paths.length;i<len;i++){
    currentPath+=path.sep+paths[i];
    if (!fs.existsSync(path)) {
      if (mkdir) {
       fs.mkdirSync(path);
      }
      result= false;
     } else {
      result=result&& true;
     }  
  }
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

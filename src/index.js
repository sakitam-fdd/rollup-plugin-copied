import path from 'path'
import fs from 'fs'

function RollupCopyPlugin (options = {}) {
  const {
    from,
    to,
    emitFiles = true
  } = options;
  return {
    load (id) {
    },
    onwrite: function write (options) {
      // Allow skipping saving files for server side builds.
      console.log(from, to, emitFiles)
      const base = path.dirname(to)
      const copies = getFileList(from)
      console.log(base, copies)
      if (!emitFiles) return
      return Promise.all((copies).map(name => {
        return copy(name, path.join(base, name))
      }))
    }
  }
}

/**
 * 获取文件树
 * @param _path
 * @returns {Array}
 */
const getFileList = _path => {
  const result = []
  function finder (path_) {
    let files = fs.readdirSync(path_)
    files.forEach((val, index) => {
      let fPath = path.join(path_, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push(val)
    })
  }
  finder(_path)
  return result
};

/**
 * 获取文件扩展名
 * @param _string
 * @returns {*}
 */
// const getFileExt = _string => {
//   if (_string && _string.split) {
//     const _arr = _string.split('.');
//     return _arr[_arr.length - 1]
//   } else {
//     return false
//   }
// };

// function promise (fn, ...args) {
//   return new Promise((resolve, reject) =>
//     fn(...args, (err, res) =>
//       err ? reject(err) : resolve(res)))
// }

function copy (src, dest) {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream(src)
    read.on('error', reject)
    const write = fs.createWriteStream(dest)
    write.on('error', reject)
    write.on('finish', resolve)
    read.pipe(write)
  })
}

export default RollupCopyPlugin

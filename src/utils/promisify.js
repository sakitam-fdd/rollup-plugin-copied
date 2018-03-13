const stat = (inputFileSystem, path) => {
  return new Promise((resolve, reject) => {
    inputFileSystem.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};

const readFile = (inputFileSystem, path) => {
  return new Promise((resolve, reject) => {
    inputFileSystem.readFile(path, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};

export {
  stat,
  readFile
}

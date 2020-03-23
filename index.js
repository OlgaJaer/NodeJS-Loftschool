const fs = require('fs');
const Watcher = require('./watcher');
const program = require('./utils/commander');
const del = require('del');

program.parse(process.argv);

const watcher = new Watcher(() => {
  console.log('Sorting complete');
  if (program.delete) {
    del(program.folder).then(() => {
      console.log('Folder deleted');
    });
  }
});

const copyFolder = require('./utils/copy')(program.output, watcher);

if (!fs.existsSync(program.folder)) {
  console.log(`Not found folder: ${program.folder}`);
  process.exit(1);
} else {
  if (!fs.existsSync(program.output)) {
    fs.mkdirSync(program.output);
  }
  copyFolder(program.folder);
  watcher.started();
}

const { program } = require('commander');

module.exports = program
  .version('0.0.1')
  .option('-f, --folder <type>', 'Input folder for sorting', './folder')
  .option('-o, --output <type>', 'Input output folder', './dist')
  .option('-d, --delete', 'Delete folder for sorting');

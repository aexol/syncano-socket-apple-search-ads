// Hackish script to embbed local deps
// into socket zip.
const fs = require('fs');
const path = require('path');
const distPjson = require('../.dist/package.json');
const Rsync = require('rsync');
const dependencies = distPjson.dependencies;

const syncanoDir = '..';
const buildDir = path.join('..', '.build');
const targetDir = path.join('.', '.dist', 'local');
const local = Object.keys(dependencies)
  .filter(d => dependencies[d].match(/^file:/))
  .reduce((acc, val) => Object.assign(acc, {[val]: dependencies[val]}), {});
for (const k of Object.keys(local)) {
  distPjson.dependencies[k] = `file:./local/${k}`;
}
fs.writeFileSync('.dist/package.json', JSON.stringify(distPjson, null, 2));

const existsDirectory = dir =>
  fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();

for (const dep of Object.keys(local)) {
  new Rsync()
    .flags('az')
    .source(local[dep].slice(5))
    .destination(targetDir)
    .exclude('.git')
    .exclude('.dist')
    .exclude('node_modules')
    .execute((error, code, cmd) => {
      if (error) {
        process.exit(code);
      }
    });
}

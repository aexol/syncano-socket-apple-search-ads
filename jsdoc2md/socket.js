const yaml = require('js-yaml');
const fs = require('fs');

exports.socket = function() {
  return yaml.safeLoad(fs.readFileSync('socket.yml').toString());
};

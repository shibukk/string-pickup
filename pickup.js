var co = require('co');
var fs = require('fs');
var recursive = require('recursive-readdir');

// var results = [];
var dir = __dirname + '/files';
var output = 'result.txt';

function readdir() {
  return function(cb) {
    recursive(dir, cb);
  }
}

function readfile(file) {
  return function(cb) {
    fs.readFile(file, {encoding: 'utf8'}, cb);
  }
}

co(function *(){
  var results = [];
  var files = yield readdir();

  for (i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.indexOf('.DS_Store') !== -1) continue;
    var data = yield readfile(file);
    for (j = 0; j < data.length; j++) {
      var c = data.charAt(j);
      if (c !== '\n' && c !== '\t' && results.indexOf(c) === -1) {
        results.push(c);
      }
    }
  }
  // console.log(results);
  fs.writeFileSync(output, results, 'utf8');
})()

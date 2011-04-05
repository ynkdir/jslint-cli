
var sys = require('sys');
var fs = require('fs');

function exit(code) {
  process.exit(code);
}

function print(msg) {
  sys.puts(msg);
}

function getargs() {
  var args = [];
  var i;
  for (i = 2; i < process.argv.length; ++i) {
    args.push(process.argv[i]);
  }
  return args;
}

function readfile(filename, callback) {
  fs.readFile(filename, function(err, buf) {
    callback(err, buf.toString());
  });
}


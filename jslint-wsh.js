
if (!WScript.Fullname.match(/cscript/i)) {
  WScript.Echo('use cscript.exe');
  WScript.Quit();
}

function exit(code) {
  WScript.Quit(code);
}

function print(msg) {
  WScript.Echo(msg);
}

function getargs() {
  var args = [];
  var i;
  for (i = 0; i < WScript.Arguments.length; ++i) {
    args.push(WScript.Arguments(i));
  }
  return args;
}

function readfile(filename, encoding /*NOTUSED*/) {
  var ForReading = 1, ForWriting = 2, ForAppending = 8;
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  var f = fso.OpenTextFile(filename, ForReading);
  var data = f.ReadAll();
  return data;
}



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

//function readfile(filename, encoding /*NOTUSED*/) {
//  var ForReading = 1, ForWriting = 2, ForAppending = 8;
//  var fso = new ActiveXObject('Scripting.FileSystemObject');
//  var f = fso.OpenTextFile(filename, ForReading);
//  var data = f.ReadAll();
//  return data;
//}

// supported encodings are listed in HKEY_CLASSES_ROOT\MIME\Database\Charset
function readfile(filename, encoding) {
  var adTypeBinary = 1, adTypeText = 2;
  var strm = new ActiveXObject('ADODB.Stream');
  strm.Type = adTypeText;
  strm.Charset = encoding;
  strm.Open();
  strm.LoadFromFile(filename);
  var data = strm.ReadText();
  return data;
}


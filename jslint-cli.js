
var option_parser = new optspec.OptionParser('jslint [options] file');
option_parser.add_option('  -h, --help     show this help message and exit');
option_parser.add_option('  --adsafe       true, if ADsafe rules should be enforced');
option_parser.add_option('  --bitwise      true, if bitwise operators should not be allowed');
option_parser.add_option('  --browser      true, if the standard browser globals should be predefined');
option_parser.add_option('  --cap          true, if upper case HTML should be allowed');
option_parser.add_option('  --continue     true, if the continuation statement should be tolerated');
option_parser.add_option('  --css          true, if CSS workarounds should be tolerated');
option_parser.add_option('  --debug        true, if debugger statements should be allowed');
option_parser.add_option('  --devel        true, if logging should be allowed (console, alert, etc.)');
option_parser.add_option('  --es5          true, if ES5 syntax should be allowed');
option_parser.add_option('  --evil         true, if eval should be allowed');
option_parser.add_option('  --forin        true, if for in statements need not filter');
option_parser.add_option('  --fragment     true, if HTML fragments should be allowed');
option_parser.add_option('  --indent=NUMBER  the indentation factor');
option_parser.add_option('  --maxerr=NUMBER  the maximum number of errors to allow');
option_parser.add_option('  --maxlen=NUMBER  the maximum length of a source line');
option_parser.add_option('  --newcap       true, if constructor names must be capitalized');
option_parser.add_option('  --node         true, if Node.js globals should be predefined');
option_parser.add_option('  --nomen        true, if names should be checked');
option_parser.add_option('  --on           true, if HTML event handlers should be allowed');
option_parser.add_option('  --onevar       true, if only one var statement per function should be allowed');
option_parser.add_option('  --passfail     true, if the scan should stop on first error');
option_parser.add_option('  --plusplus     true, if increment/decrement should not be allowed');
option_parser.add_option('  --regexp       true, if the . should not be allowed in regexp literals');
option_parser.add_option('  --rhino        true, if the Rhino environment globals should be predefined');
option_parser.add_option('  --undef        true, if variables should be declared before used');
option_parser.add_option('  --unparam      true, if unused parameters should be tolerated');
option_parser.add_option('  --safe         true, if use of some browser features should be restricted');
option_parser.add_option('  --windows      true, if MS Windows-specific globals should be predefined');
option_parser.add_option("  --strict       true, require the 'use strict'; pragma");
option_parser.add_option('  --sub          true, if all forms of subscript notation are tolerated');
option_parser.add_option('  --white        true, if strict whitespace rules apply');
option_parser.add_option('  --widget       true  if the Yahoo Widgets globals should be predefined');

function main() {
  var args, filename, data, noerror, i;
  try {
    args = option_parser.parse_args(getargs());
  } catch (ex) {
    print(ex.message);
    exit(1);
  }
  if (args.opts.help || args.args.length === 0) {
    print(option_parser.format_help());
    exit(0);
  }
  filename = args.args[0];
  data = readfile(args.args[0], 'utf-8');
  noerror = JSLINT(data, args.opts);
  if (!noerror) {
    for (i = 0; i < JSLINT.errors.length; ++i) {
      var e = JSLINT.errors[i];
      if (e === null) {
        break;
      }
      print([filename, e.line, e.character, e.reason].join(':'));
    }
  }
}

main();

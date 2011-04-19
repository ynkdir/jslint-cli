
wget=wget --no-check-certificate

all: bin/jslint bin/jslint.bat

bin/jslint: jslint.js jslint-node.js optspec.js jslint-cli.js
	echo "#!/usr/bin/env node" > $@
	cat $^ >> $@

bin/jslint.bat: jslint.js jslint-wsh.js optspec.js jslint-cli.js
	echo '@set @junk=1 /*' > $@
	echo '@echo off' >> $@
	echo 'cscript //nologo //E:jscript "%~dpn0.bat" %*' >> $@
	echo 'goto :eof' >> $@
	echo '*/' >> $@
	cat $^ >> $@
	# unix2dos
	sed 's/$$/\r/' $@ > __tmp && mv __tmp $@

jslint.js:
	$(wget) https://github.com/douglascrockford/JSLint/raw/master/jslint.js


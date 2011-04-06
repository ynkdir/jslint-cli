
all: bin/jslint bin/jslint.bat

bin/jslint: fulljslint.js jslint-node.js jslint-cli.js
	echo "#!/usr/bin/env node" > bin/jslint
	cat fulljslint.js jslint-node.js jslint-cli.js >> bin/jslint

bin/jslint.bat: fulljslint.js jslint-wsh.js jslint-cli.js
	echo '@set @junk=1 /*' > $@
	echo '@echo off' >> $@
	echo 'cscript //nologo //E:jscript "%~dpn0.bat" %*' >> $@
	echo 'goto :eof' >> $@
	echo '*/' >> $@
	cat fulljslint.js jslint-wsh.js jslint-cli.js >> $@
	# unix2dos
	sed 's/$$/\r/' $@ > __tmp
	mv __tmp $@

fulljslint.js:
	wget --no-check-certificate https://github.com/douglascrockford/JSLint/raw/master/fulljslint.js


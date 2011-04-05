
all: bin/jslint bin/jslint-wsh-cli.js

bin/jslint: fulljslint.js jslint-node.js jslint-cli.js
	echo "#!/usr/bin/env js" > bin/jslint
	cat fulljslint.js jslint-node.js jslint-cli.js >> bin/jslint

bin/jslint-wsh-cli.js: fulljslint.js jslint-wsh.js jslint-cli.js
	cat fulljslint.js jslint-wsh.js jslint-cli.js >> bin/jslint-wsh-cli.js

fulljslint.js:
	wget --no-check-certificate https://github.com/douglascrockford/JSLint/raw/master/fulljslint.js


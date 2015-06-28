build:
	babel lib/index.js --out-file dist/index.js

test: build
	babel-node bin/builder > opt/test/build.js
	mocha opt/test/build.js

clean:
	@rm opt/test/build.js

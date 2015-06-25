build:
	babel-node ./bin/builder > opt/test/build.js

test: build
	mocha opt/test/build.js

clean:
	@rm opt/test/build.js

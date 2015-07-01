SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

build:
	node bin/builder > opt/test/build.js

test: build
	@mocha --reporter spec opt/test/build.js

clean:
	@rm opt/test/build.js

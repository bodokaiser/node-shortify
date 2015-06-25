BUILDER					= babel-node ./bin/builder
MOCHA_PHANTOMJS			= node ./node_modules/.bin/mocha-phantomjs

MOCHA_FLAGS = \
	--reporter spec

PHANTOMJS_FLAGS = \
	--debug=true

build:
	$(BUILDER) > opt/test/build.js

test: build
	$(MOCHA_PHANTOMJS) $(MOCHA_FLAGS) $(PHANTOMJS_FLAGS) \
		opt/test/index.html

clean:
	@rm opt/test/build.js

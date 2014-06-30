REPORTER=spec

test: hint jstest

jstest:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) -t 10000 test/*.js

test-watch:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) -b -t 10000 -w test/*.js

hint:
	@./node_modules/.bin/jshint command lib listener resource service test

.PHONY: test test-watch

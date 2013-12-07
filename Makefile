REPORTER=spec

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) -b -t 10000 test/*.js

test-watch:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) -b -t 10000 -w test/*.js

.PHONY: test test-watch
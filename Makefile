REPORTER=spec

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) -b -t 10000 test/*.js

test-watch:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) -b -t 10000 -w test/*.js

test-cov: lib-cov
	@TEST_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
	@rm src-cov -r

lib-cov:
	@jscoverage src src-cov

.PHONY: test test-watch test-cov
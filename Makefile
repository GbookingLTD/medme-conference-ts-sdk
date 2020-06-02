build:
	rm -rf dist/* && tsc -b tsconfig.cjs.json && \
		tsc -b tsconfig.es2015.json

test:
	npm run test
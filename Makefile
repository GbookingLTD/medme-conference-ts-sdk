build: build_cjs build_umd build_amd

build_cjs: clear_cjs
	tsc -p tsconfig.json -m commonjs --outDir dist/cjs

build_amd: clear_amd
	tsc -p tsconfig.json -m amd --outfile dist/amd/index.js

build_umd: clear_umd
	tsc -p tsconfig.json -m umd --outDir dist/umd

clear_amd:
	rm -rf dist/amd/*

clear_umd:
	rm -rf dist/umd/*

clear_cjs:
	rm -rf dist/cjs/*

clear:
	rm -rf dist/*

test:
	npm run test
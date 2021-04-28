build: gen_lang_index build_cjs build_amd build_web copy_web_to_root

build_cjs: clear_cjs
	tsc -p tsconfig.json --resolveJsonModule -m commonjs --removeComments --outDir dist/cjs

build_amd: clear_amd
	tsc -p tsconfig.json -m amd --removeComments --outfile dist/amd/index.js

build_umd: clear_umd
	tsc -p tsconfig.json -m umd --removeComments --outDir dist/umd

build_web: clear_web
	webpack -c webpack.web.config.js
	webpack -c webpack.web.min.config.js

gen_lang_index:
	node gen_lang_index.js > medme/lang/index.ts

copy_web_to_root:
	cp dist/web/index.all.js mmconf.js
	cp dist/web/index.all.min.js mmconf.min.js

clear_amd:
	rm -rf dist/amd/*

clear_umd:
	rm -rf dist/umd/*

clear_cjs:
	rm -rf dist/cjs/*

clear_web:
	rm -rf dist/web/*

clear:
	rm -rf dist/*

test-ci:
	npm run test-ci

test:
	npm run test

get-deps:
	npm i && \
		npm install -g typescript webpack webpack-cli

get-jitsi-meet:
	wget -O medme/jitsi-meet.js https://jitsi.mmconf.net/external_api.js &&
	tsc -d medme/jitsi-meet.js

serve-openapi:
	python3.8 -m http.server 4000

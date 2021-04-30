build: gen_lang_index build_cjs build_amd build_es2015 build_web copy_web_to_root

build_cjs: clear_cjs
	tsc -p tsconfig.json -m commonjs --removeComments --outDir dist/cjs

build_amd: clear_amd
	tsc -p tsconfig.json -m amd --removeComments --outfile dist/amd/index.js

build_es2015: clear_es2015
	tsc -p tsconfig.json -m es2015 --removeComments --outDir dist/es2015

build_web: build_webpack copy_web_to_root copy_web_to_app

serve_app:
	cd examples/app/public && python3.8 -m http.server 4000

build_webpack: clear_web
	webpack -c webpack.web.config.js

build_example_app:
	webpack -c webpack.examples.app.config.js

gen_lang_index:
	node gen_lang_index.js > medme/lang/index.ts

copy_web_to_root:
	cp dist/web/index.all.js mmconf.js
	cp dist/web/index.all.js mmconf.js.map
	cp dist/web/index.all.js mmconf.min.js
	cp dist/web/index.all.js mmconf.min.js.map

copy_web_to_app:
	cp dist/web/index.all.js examples/app/public/mmconf.js
	cp dist/web/index.all.js examples/app/public/mmconf.js.map

clear_amd:
	rm -rf dist/amd/*

clear_es2015:
	rm -rf dist/es2015/*

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

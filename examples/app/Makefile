all: build serve

build: clean build_amd build_es2015 build_web

build_amd:
	tsc -p tsconfig.json -m amd --removeComments --outfile public/app.amd.js

build_es2015:
	[ -d public/app.es2015 ] || mkdir public/app.es2015 
	rm -rf public/app.es2015/*
	tsc -p tsconfig.json -m es2015 --removeComments --outDir public/app.es2015

build_web:
	webpack -c webpack.examples.app.config.js

clean:
	rm -f public/app.amd.js
	rm -f public/app.amd.js.map
	rm -f public/app.js

serve:
	cd public && python3.8 -m http.server 4000
	cd ..

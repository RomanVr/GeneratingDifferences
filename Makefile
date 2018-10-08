start:
		npm run babel-node -- src/bin/gendiff.js -h

install:
		npm install

lint:
		npm run eslint .

test:
		npm run test

build:
		rm -rf dist
		npm run build

publish:
		npm publish

.PHONY: test

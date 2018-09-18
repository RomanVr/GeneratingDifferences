install:
		npm install

start:
		npm run babel-node -- src/bin/gendiff.js before.json after.json

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

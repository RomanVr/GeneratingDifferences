pathToTestFile="__tests__/__fixtures__/"

start:
		npm run babel-node -- src/bin/gendiff.js -h

start1:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.json $(pathToTestFile)after.json

start2:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.yml $(pathToTestFile)after.yml

start3:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.ini $(pathToTestFile)after.ini

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

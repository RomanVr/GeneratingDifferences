pathToTestFile="__tests__/__fixtures__/"

start:
		npm run babel-node -- src/bin/gendiff.js -h

start1:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.json $(pathToTestFile)after.json

starterr:
		npm run babel-node -- src/bin/gendiff.js ./1/before.json $(pathToTestFile)after.json

start2:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.yml $(pathToTestFile)after.yml

start3:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.ini $(pathToTestFile)after.ini

starttree:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)beforeTree.json $(pathToTestFile)afterTree.json

starterr2:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.txt $(pathToTestFile)after.json

start5:
		npm run babel-node -- src/bin/gendiff.js --format plain $(pathToTestFile)before.json $(pathToTestFile)after.json

start5tree:
		npm run babel-node -- src/bin/gendiff.js --format plain $(pathToTestFile)beforeTree.json $(pathToTestFile)afterTree.json

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

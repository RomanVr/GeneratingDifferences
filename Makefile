
pathToTestFile="__tests__/__fixtures__/"

install:
		npm install

start1:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.json $(pathToTestFile)after.json

starttree:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)beforeTree.json $(pathToTestFile)afterTree.json

starttree1:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)beforeTree.yml $(pathToTestFile)afterTree.yml

starttree2:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)beforeTree.ini $(pathToTestFile)afterTree.ini

start2:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.yml $(pathToTestFile)after.yml

startBroken:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)beforeBroken.yml $(pathToTestFile)after.yml

start3:
		npm run babel-node -- src/bin/gendiff.js $(pathToTestFile)before.ini $(pathToTestFile)after.ini

start4:
		npm run babel-node -- src/bin/gendiff.js --format json $(pathToTestFile)before.json $(pathToTestFile)after.json

start5:
		npm run babel-node -- src/bin/gendiff.js --format plain $(pathToTestFile)before.json $(pathToTestFile)after.json

start5tree:
		npm run babel-node -- src/bin/gendiff.js --format plain $(pathToTestFile)beforeTree.json $(pathToTestFile)afterTree.json

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

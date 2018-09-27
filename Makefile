install:
		npm install

start1:
		npm run babel-node -- src/bin/gendiff.js before.json after.json

starttree:
		npm run babel-node -- src/bin/gendiff.js beforeTree.json afterTree.json

starttree1:
		npm run babel-node -- src/bin/gendiff.js beforeTree.yml afterTree.yml

starttree2:
		npm run babel-node -- src/bin/gendiff.js beforeTree.ini afterTree.ini

start2:
		npm run babel-node -- src/bin/gendiff.js before.yml after.yml

startBroken:
		npm run babel-node -- src/bin/gendiff.js beforeBroken.yml after.yml

start3:
		npm run babel-node -- src/bin/gendiff.js before.ini after.ini

start4:
		npm run babel-node -- src/bin/gendiff.js --format json before.json after.json

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

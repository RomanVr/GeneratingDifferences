install:
		npm install

start1:
		npm run babel-node -- src/bin/gendiff.js before.json after.json

start2:
		npm run babel-node -- src/bin/gendiff.js before.yml after.yml

start3:
		npm run babel-node -- src/bin/gendiff.js beforeBroken.yml after.yml

start4:
		npm run babel-node -- src/bin/gendiff.js beforeBroken.yml after1.yml

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

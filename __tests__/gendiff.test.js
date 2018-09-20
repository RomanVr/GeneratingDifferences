import fs from 'fs';
import gendiff from '../src';


const pathToFileJson1 = './__tests__/__fixtures__/before.json';
const pathToFileJson2 = './__tests__/__fixtures__/after.json';

const pathToFileYaml1 = './__tests__/__fixtures__/before.yml';
const pathToFileYaml2 = './__tests__/__fixtures__/after.yml';

const diff = fs.readFileSync('./__tests__/__fixtures__/diff.txt', 'utf8');

test(`should be return ${diff}`, () => {
  expect(gendiff(pathToFileJson1, pathToFileJson2)).toBe(diff);
  expect(gendiff(pathToFileYaml1, pathToFileYaml2)).toBe(diff);
});

import fs from 'fs';
import gendiff from '../src';


const pathToFileJson1 = './__tests__/__fixtures__/before.json';
const pathToFileJson2 = './__tests__/__fixtures__/after.json';

const pathToFileYaml1 = './__tests__/__fixtures__/before.yml';
const pathToFileYaml2 = './__tests__/__fixtures__/after.yml';

const pathToFileIni1 = './__tests__/__fixtures__/before.ini';
const pathToFileIni2 = './__tests__/__fixtures__/after.ini';

const pathToFileJson1Tree = './__tests__/__fixtures__/beforeTree.json';
const pathToFileJson2Tree = './__tests__/__fixtures__/afterTree.json';

const pathToFileYaml1Tree = './__tests__/__fixtures__/beforeTree.yml';
const pathToFileYaml2Tree = './__tests__/__fixtures__/afterTree.yml';

const pathToFileIni1Tree = './__tests__/__fixtures__/beforeTree.ini';
const pathToFileIni2Tree = './__tests__/__fixtures__/afterTree.ini';

test('must return the differenct between files before and after', () => {
  const diff = fs.readFileSync('./__tests__/__fixtures__/diff.txt', 'utf8');
  const diffTreeJson = fs.readFileSync('./__tests__/__fixtures__/diffTreeJson.txt', 'utf8');
  expect(gendiff(pathToFileJson1, pathToFileJson2)).toBe(diff);
  expect(gendiff(pathToFileYaml1, pathToFileYaml2)).toBe(diff);
  expect(gendiff(pathToFileIni1, pathToFileIni2)).toBe(diff);
  expect(gendiff(pathToFileJson1Tree, pathToFileJson2Tree)).toBe(diffTreeJson);
  expect(gendiff(pathToFileYaml1Tree, pathToFileYaml2Tree)).toBe(diffTreeJson);
  expect(gendiff(pathToFileIni1Tree, pathToFileIni2Tree)).toBe(diffTreeJson);
});

import fs from 'fs';
import gendiff from '../src';


const pathToFileJson1 = './__tests__/__fixtures__/before.json';
const pathToFileJson2 = './__tests__/__fixtures__/after.json';

const pathToFileYaml1 = './__tests__/__fixtures__/before.yml';
const pathToFileYaml2 = './__tests__/__fixtures__/after.yml';

const pathToFileIni1 = './__tests__/__fixtures__/before.ini';
const pathToFileIni2 = './__tests__/__fixtures__/after.ini';

const getDiffResult = () => fs.readFileSync('./__tests__/__fixtures__/diff.txt', 'utf8');

test(`should be return ${getDiffResult()}`, () => {
  const diff = getDiffResult();
  expect(gendiff(pathToFileJson1, pathToFileJson2)).toBe(diff);
  expect(gendiff(pathToFileYaml1, pathToFileYaml2)).toBe(diff);
  expect(gendiff(pathToFileIni1, pathToFileIni2)).toBe(diff);
});

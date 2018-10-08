import fs from 'fs';
import gendiff from '../src';


const pathToFileJson1 = './__tests__/__fixtures__/before.json';
const pathToFileJson2 = './__tests__/__fixtures__/after.json';

test('must return the differenct between files before and after', () => {
  const diff = fs.readFileSync('./__tests__/__fixtures__/diff.txt', 'utf8');
  expect(gendiff(pathToFileJson1, pathToFileJson2)).toBe(diff);
});

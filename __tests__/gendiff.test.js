import fs from 'fs';
import gendiff from '../src';

test('must return the differenct between files before and after', () => {
  const diff = fs.readFileSync('./__tests__/__fixtures__/diff.txt', 'utf8');
  const diffTreeJson = fs.readFileSync('./__tests__/__fixtures__/diffTreeJson.txt', 'utf8');
  const typesData = ['json', 'yml', 'ini'];
  const pathTemplate = './__tests__/__fixtures__/';
  typesData.forEach((type) => {
    expect(gendiff(`${pathTemplate}before.${type}`, `${pathTemplate}after.${type}`)).toBe(diff);
    expect(gendiff(`${pathTemplate}beforeTree.${type}`, `${pathTemplate}afterTree.${type}`)).toBe(diffTreeJson);
  });
});

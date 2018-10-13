import fs from 'fs';
import gendiff from '../src';

test('must return the differenct between files before and after', () => {
  const diff = fs.readFileSync('./__tests__/__fixtures__/diff.txt', 'utf8');
  const diffTreePretty = fs.readFileSync('./__tests__/__fixtures__/diffTreePretty.txt', 'utf8');
  const diffTreePlain = fs.readFileSync('./__tests__/__fixtures__/diffTreePlain.txt', 'utf8');
  const typesData = ['json', 'yml', 'ini'];
  const pathTemplate = './__tests__/__fixtures__/';
  typesData.forEach((type) => {
    expect(gendiff(`${pathTemplate}before.${type}`, `${pathTemplate}after.${type}`)).toBe(diff);
    expect(gendiff(`${pathTemplate}beforeTree.${type}`, `${pathTemplate}afterTree.${type}`)).toBe(diffTreePretty);
    expect(gendiff(`${pathTemplate}beforeTree.${type}`, `${pathTemplate}afterTree.${type}`, 'plain')).toBe(diffTreePlain);
  });
});

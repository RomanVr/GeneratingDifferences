import gendiffFunction from '../src/gendiffFunction';
import diff from './__fixtures__/diff';

const pathToFile1 = './__tests__/__fixtures__/before.json';
const pathToFile2 = './__tests__/__fixtures__/after.json';

test(`should be return ${diff}`, () => {
  expect(gendiffFunction(pathToFile1, pathToFile2)).toBe(diff);
});

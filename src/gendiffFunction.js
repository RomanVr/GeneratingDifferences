import _ from 'lodash';
import fs from 'fs';
import parse from './parsers';

const gendiffFunction = (pathToFile1, pathToFile2) => {
  const fileBefore = fs.readFileSync(pathToFile1, 'utf8');
  const fileAfter = fs.readFileSync(pathToFile2, 'utf8');
  const beforeObj = parse(fileBefore);
  const afterObj = parse(fileAfter);
  const keys = _.union(_.keys(beforeObj), _.keys(afterObj));
  const reducer = (acc, key) => {
    if (_.has(beforeObj, key) && !_.has(afterObj, key)) return [...acc, `  - ${key}: ${beforeObj[key]}\n`];
    if (!_.has(beforeObj, key) && _.has(afterObj, key)) return [...acc, `  + ${key}: ${afterObj[key]}\n`];
    if (beforeObj[key] === afterObj[key]) {
      return [...acc, `    ${key}: ${beforeObj[key]}\n`];
    }
    return [...acc, `  + ${key}: ${afterObj[key]}\n`, `  - ${key}: ${beforeObj[key]}\n`];
  };
  const strDiff = `${keys.reduce(reducer, ['{\n']).join('')}}\n`;
  return strDiff;
};

export default gendiffFunction;

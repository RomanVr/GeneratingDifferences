import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const gendiffFunction = (path1, path2) => {
  const dataBefore = fs.readFileSync(path1, 'utf8');
  const dataAfter = fs.readFileSync(path2, 'utf8');
  const extentionFileBefore = path.extname(path1).substring(1);
  const extentionFileAfter = path.extname(path2).substring(1);
  const beforeObj = parse(extentionFileBefore, dataBefore);
  const afterObj = parse(extentionFileAfter, dataAfter);
  const keys = _.union(_.keys(beforeObj), _.keys(afterObj));
  const reducer = (acc, key) => {
    if (_.has(beforeObj, key) && !_.has(afterObj, key)) return [...acc, `  - ${key}: ${beforeObj[key]}`];
    if (!_.has(beforeObj, key) && _.has(afterObj, key)) return [...acc, `  + ${key}: ${afterObj[key]}`];
    if (beforeObj[key] === afterObj[key]) {
      return [...acc, `    ${key}: ${beforeObj[key]}`];
    }
    return [...acc, `  + ${key}: ${afterObj[key]}`, `  - ${key}: ${beforeObj[key]}`];
  };
  const strDiff = `${keys.reduce(reducer, ['{']).join('\n')}\n}\n`;
  return strDiff;
};

export default gendiffFunction;

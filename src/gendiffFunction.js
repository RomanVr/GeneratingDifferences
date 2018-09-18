import { has } from 'lodash';
import fs from 'fs';

const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};
const gendiffFunction = (pathToFile1, pathToFile2) => {
  if (!fs.existsSync(pathToFile1)) {
    console.error(`${pathToFile1} does not exist`);
    return false;
  }
  const beforeObj = parseJson(fs.readFileSync(pathToFile1, 'utf8'));
  if (!fs.existsSync(pathToFile2)) {
    console.error(`${pathToFile2} does not exist`);
    return false;
  }
  const afterObj = parseJson(fs.readFileSync(pathToFile2, 'utf8'));
  const unionObj = { ...beforeObj, ...afterObj };
  const reducer = (acc, key) => {
    let newAcc;
    if (has(beforeObj, key) && has(afterObj, key)) {
      if (beforeObj[key] === afterObj[key]) {
        newAcc = [...acc, `\n    ${key}: ${beforeObj[key]}`];
      } else {
        newAcc = [...acc, `\n  + ${key}: ${afterObj[key]}`, `\n  - ${key}: ${beforeObj[key]}`];
      }
    } else if (has(beforeObj, key)) {
      newAcc = [...acc, `\n  - ${key}: ${beforeObj[key]}`];
    } else {
      newAcc = [...acc, `\n  + ${key}: ${afterObj[key]}`];
    }
    return newAcc;
  };
  const strDiff = `${Object.keys(unionObj).reduce(reducer, ['{']).join('')}\n}`;
  return strDiff;
};

export default gendiffFunction;

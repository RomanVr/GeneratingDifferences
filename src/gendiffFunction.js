import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import FormatException from './formatException';
import PathToFileException from './pathToFileException';

const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return false;
  }
};
const parseYaml = (data) => {
  try {
    return yaml.safeLoad(data);
  } catch (e) {
    console.log(e);
    return false;
  }
};
const mappingToParse = [
  {
    parseIt: parseJson,
    check: (arg) => {
      try {
        JSON.parse(arg);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  {
    parseIt: parseYaml,
    check: (arg) => {
      try {
        yaml.safeLoad(arg);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
];

const getParseAction = arg => mappingToParse.find(({ check }) => check(arg));
const parse = (strData) => {
  const parseResult = getParseAction(strData);
  if (parseResult !== undefined) {
    const { parseIt } = parseResult;
    return parseIt(strData);
  }
  throw new FormatException();
};
const gendiffFunction = (pathToFile1, pathToFile2) => {
  if (!fs.existsSync(pathToFile1)) {
    throw new PathToFileException();
  }
  if (!fs.existsSync(pathToFile2)) {
    throw new PathToFileException();
  }
  const fileBefore = fs.readFileSync(pathToFile1, 'utf8');
  const fileAfter = fs.readFileSync(pathToFile2, 'utf8');
  const beforeObj = parse(fileBefore);
  const afterObj = parse(fileAfter);
  const keys = _.union(_.keys(beforeObj), _.keys(afterObj));
  const reducer = (acc, key) => {
    if (_.has(beforeObj, key) && !_.has(afterObj, key)) return [...acc, `\n  - ${key}: ${beforeObj[key]}`];
    if (!_.has(beforeObj, key) && _.has(afterObj, key)) return [...acc, `\n  + ${key}: ${afterObj[key]}`];
    if (beforeObj[key] === afterObj[key]) {
      return [...acc, `\n    ${key}: ${beforeObj[key]}`];
    }
    return [...acc, `\n  + ${key}: ${afterObj[key]}`, `\n  - ${key}: ${beforeObj[key]}`];
  };
  const strDiff = `${keys.reduce(reducer, ['{']).join('')}\n}`;
  return strDiff;
};

export default gendiffFunction;

import yaml from 'js-yaml';
import _ from 'lodash';

const parseJson = data => JSON.parse(data);

const parseYaml = data => yaml.safeLoad(data);

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
    check: arg => _.isObject(yaml.safeLoad(arg)),
  },
];
const getParseAction = arg => mappingToParse.find(({ check }) => check(arg));
const parse = (strData) => {
  const { parseIt } = getParseAction(strData);
  return parseIt(strData);
};

export default parse;

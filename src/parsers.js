import yaml from 'js-yaml';
import ini from 'ini';

const parseJson = ({ data }) => JSON.parse(data);

const parseYaml = ({ data }) => yaml.safeLoad(data);

const parseIni = ({ data }) => ini.parse(data);

const mappingToParse = [
  {
    parseIt: parseYaml,
    check: arg => arg === 'yml',
  },
  {
    parseIt: parseJson,
    check: arg => arg === 'json',
  },
  {
    parseIt: parseIni,
    check: arg => arg === 'ini',
  },
];

const getParseAction = ({ extentionFile }) => mappingToParse
  .find(({ check }) => check(extentionFile));

const parse = (objData) => {
  const { parseIt } = getParseAction(objData);
  return parseIt(objData);
};

export default parse;

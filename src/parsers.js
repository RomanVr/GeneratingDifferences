import yaml from 'js-yaml';

const parseJson = ({ data }) => JSON.parse(data);

const parseYaml = ({ data }) => yaml.safeLoad(data);

const mappingToParse = [
  {
    parseIt: parseYaml,
    check: arg => arg === 'yml',
  },
  {
    parseIt: parseJson,
    check: arg => arg === 'json',
  },
];

const getParseAction = ({ extentionFile }) => mappingToParse
  .find(({ check }) => check(extentionFile));

const parse = (objData) => {
  const { parseIt } = getParseAction(objData);
  return parseIt(objData);
};

export default parse;

import yaml from 'js-yaml';

const mappingToParse = {
  yml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (typeData, data) => mappingToParse[typeData](data);

export default parse;

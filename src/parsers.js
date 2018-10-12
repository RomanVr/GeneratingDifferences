import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const mappingToParse = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const parse = (typeData, data) => {
  if (!_.has(mappingToParse, typeData)) {
    throw new Error(`not possible to parse type: ${typeData}`);
  }
  return mappingToParse[typeData](data);
};

export default parse;

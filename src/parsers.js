import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import ParsersError from './parsersError';

const mappingToParse = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const types = new Set(_.keys(mappingToParse));

const parse = (typeData, data) => {
  if (!types.has(typeData)) {
    throw new ParsersError(typeData);
  }
  return mappingToParse[typeData](data);
};

export default parse;

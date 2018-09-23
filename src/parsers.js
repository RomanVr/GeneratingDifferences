import yaml from 'js-yaml';
import ini from 'ini';

const mappingToParse = {
  yml: data => yaml.safeLoad(data),
  json: data => JSON.parse(data),
  ini: data => ini.parse(data),
};

const parse = objData => mappingToParse[objData.extention](objData.data);

export default parse;

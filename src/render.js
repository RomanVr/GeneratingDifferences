import _ from 'lodash';

const signToRender = {
  added: '+',
  deleted: '-',
  changed: '-',
  unchanged: ' ',
};

const jsonRender = (ast) => {
  const indent = ' '.repeat(4);
  const iter = (astIter, deep = '') => astIter.map((item) => {
    const data = _.isArray(item.dataProperty) ? `{${iter(item.dataProperty, `${deep}${indent}`)}\n${deep}${indent}}` : item.dataProperty;
    return `\n ${deep} ${signToRender[item.statusProperty]} ${item.nameProperty}: ${data}`;
  }).join('');
  return `{${iter(ast, '')}\n}\n`;
};

const plainTextRender = ast => jsonRender(ast);

const mappingToRender = {
  json: jsonRender,
  plain: plainTextRender,
};

const render = (ast, typeRender = 'json') => mappingToRender[typeRender](ast);

export default render;

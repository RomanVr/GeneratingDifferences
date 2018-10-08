import _ from 'lodash';

const signToRender = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const indent = ' '.repeat(4);

const stringifyJson = (data, deep) => {
  if (!_.isPlainObject(data)) return data;
  const dataToString = _.keys(data).map(key => `${deep}${indent}  ${key}: ${data[key]}`).join('\n');
  return `{\n${dataToString}\n${deep}${indent}}`;
};

const iterJson = (astIter, deep = '') => astIter.map((node) => {
  if (node.statusProperty === 'unchanged' && _.isArray(node.dataProperty)) {
    return ` ${deep} ${signToRender[node.statusProperty]} ${node.nameProperty}: {\n${iterJson(node.dataProperty, `${deep}${indent}`)}\n${deep}${indent}}`;
  }
  if (node.statusProperty === 'changed') {
    return ` ${deep} + ${node.nameProperty}: ${stringifyJson(node.afterProperty, deep)}\n ${deep} - ${node.nameProperty}: ${stringifyJson(node.beforeProperty, deep)}`;
  }
  return ` ${deep} ${signToRender[node.statusProperty]} ${node.nameProperty}: ${stringifyJson(node.dataProperty, deep)}`;
}).join('\n');

const render = ast => `{\n${iterJson(ast, '')}\n}\n`;

export default render;

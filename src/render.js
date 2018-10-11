import _ from 'lodash';

const signToRender = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const indent = ' '.repeat(4);

const stringifyJson = (dataProperty, deep) => {
  if (!_.isPlainObject(dataProperty)) return dataProperty;
  const dataToString = _.keys(dataProperty).map(key => `${deep}${indent}  ${key}: ${dataProperty[key]}`).join('\n');
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

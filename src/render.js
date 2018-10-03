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

const jsonRender = ast => `{\n${iterJson(ast, '')}\n}\n`;

const stringifyPlain = (data) => {
  if (_.isPlainObject(data)) return '[complex value]';
  if (typeof data === 'string') return `'${data}'`;
  return data;
};

const plainToRender = {
  added: node => `was added wish value: ${stringifyPlain(node.dataProperty)}`,
  deleted: () => 'was removed',
  changed: node => `was updated. From ${stringifyPlain(node.beforeProperty)} to ${stringifyPlain(node.afterProperty)}`,
  unchanged: () => 'not changed',
};

const iterPlain = (astIter, nameParent) => astIter.map((node) => {
  if (node.statusProperty === 'unchanged' && _.isArray(node.dataProperty)) {
    return iterPlain(node.dataProperty, `${nameParent}${node.nameProperty}.`);
  }
  return `Property '${nameParent}${node.nameProperty}' ${plainToRender[node.statusProperty](node)}`;
}).join('\n');

const plainTextRender = ast => `${iterPlain(ast, '')}\n`;

const mappingToRender = {
  json: jsonRender,
  plain: plainTextRender,
};

const render = (ast, typeRender) => mappingToRender[typeRender](ast);

export default render;

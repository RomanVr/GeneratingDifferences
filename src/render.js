import _ from 'lodash';

const indent = ' '.repeat(4);

const stringifyJson = (valueProperty, deep) => {
  if (!_.isPlainObject(valueProperty)) return valueProperty;
  const dataToString = _.keys(valueProperty).map(key => `${deep}${indent}  ${key}: ${valueProperty[key]}`).join('\n');
  return `{\n${dataToString}\n${deep}${indent}}`;
};

const iterJsonAst = (ast, deepAst) => {
  const jsonToRenderStatus = {
    added: (node, deep, acc) => [...acc, ` ${deep} + ${node.nameProperty}: ${stringifyJson(node.newValue, deep)}`],
    deleted: (node, deep, acc) => [...acc, ` ${deep} - ${node.nameProperty}: ${stringifyJson(node.oldValue, deep)}`],
    nested: (node, deep, acc) => [...acc, ` ${deep}   ${node.nameProperty}: {\n${iterJsonAst(node.children, `${deep}${indent}`)}\n${deep}${indent}}`],
    unchanged: (node, deep, acc) => [...acc, ` ${deep}   ${node.nameProperty}: ${stringifyJson(node.value, deep)}`],
    changed: (node, deep, acc) => [...acc, ` ${deep} + ${node.nameProperty}: ${stringifyJson(node.newValue, deep)}`, ` ${deep} - ${node.nameProperty}: ${stringifyJson(node.oldValue, deep)}`],
  };

  return ast.reduce((acc, node) => jsonToRenderStatus[node.statusProperty](node, deepAst, acc), []).join('\n');
};

const render = ast => `{\n${iterJsonAst(ast, '')}\n}\n`;

export default render;

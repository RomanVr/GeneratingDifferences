import _ from 'lodash';

const indent = ' '.repeat(4);

const stringify = (nodeValue, deep) => {
  if (!_.isPlainObject(nodeValue)) return nodeValue;
  const dataToString = _.keys(nodeValue).map(key => `${deep}${indent}  ${key}: ${nodeValue[key]}`).join('\n');
  return `{\n${dataToString}\n${deep}${indent}}`;
};

const iterPrettyAst = (ast, deepAst) => {
  const prettyToRenderType = {
    added: (node, deep, acc) => [...acc, ` ${deep} + ${node.nameProperty}: ${stringify(node.newValue, deep)}`],
    deleted: (node, deep, acc) => [...acc, ` ${deep} - ${node.nameProperty}: ${stringify(node.oldValue, deep)}`],
    nested: (node, deep, acc) => [...acc, ` ${deep}   ${node.nameProperty}: {\n${
      iterPrettyAst(node.children, `${deep}${indent}`)
    }\n${deep}${indent}}`],
    unchanged: (node, deep, acc) => [...acc, ` ${deep}   ${node.nameProperty}: ${stringify(node.value, deep)}`],
    changed: (node, deep, acc) => [...acc, ` ${deep} + ${node.nameProperty}: ${stringify(node.newValue, deep)}`,
      ` ${deep} - ${node.nameProperty}: ${stringify(node.oldValue, deep)}`],
  };

  return ast.reduce((acc, node) => prettyToRenderType[node.typeProperty](node, deepAst, acc), []).join('\n');
};

const prettyRender = ast => `{\n${iterPrettyAst(ast, '')}\n}\n`;

export default prettyRender;

import _ from 'lodash';

const indent = ' '.repeat(4);

const stringify = (nodeValue, deep) => {
  if (!_.isPlainObject(nodeValue)) return nodeValue;
  const dataToString = _.keys(nodeValue).map(key => `${deep}${indent}  ${key}: ${nodeValue[key]}`).join('\n');
  return `{\n${dataToString}\n${deep}${indent}}`;
};

const iterPretty = (ast, deepAst) => {
  const prettyToRenderType = {
    added: (node, deep) => ` ${deep} + ${node.nameProperty}: ${stringify(node.newValue, deep)}`,
    deleted: (node, deep) => ` ${deep} - ${node.nameProperty}: ${stringify(node.oldValue, deep)}`,
    nested: (node, deep) => [
      ` ${deep}   ${node.nameProperty}: {`,
      iterPretty(node.children, `${deep}${indent}`),
      `${deep}${indent}}`,
    ],
    unchanged: (node, deep) => ` ${deep}   ${node.nameProperty}: ${stringify(node.value, deep)}`,
    changed: (node, deep) => [` ${deep} + ${node.nameProperty}: ${stringify(node.newValue, deep)}`,
      ` ${deep} - ${node.nameProperty}: ${stringify(node.oldValue, deep)}`],
  };

  return ast.map(node => prettyToRenderType[node.typeProperty](node, deepAst));
};

const prettyRender = ast => `{\n${_.flattenDeep(iterPretty(ast, '')).join('\n')}\n}\n`;

export default prettyRender;

import _ from 'lodash';

const stringify = (nodeValue) => {
  if (_.isPlainObject(nodeValue)) return '[complex value]';
  if (typeof nodeValue === 'string') return `'${nodeValue}'`;
  return nodeValue;
};

const iterPlain = (astIter, nameParentAst) => {
  const plainToRenderType = {
    added: (node, nameParent) => `'${nameParent}${node.nameProperty} was added wish value: ${stringify(node.newValue)}`,
    deleted: (node, nameParent) => `'${nameParent}${node.nameProperty}' was removed`,
    nested: (node, nameParent) => iterPlain(node.children, `${nameParent}${node.nameProperty}.`),
    changed: (node, nameParent) => `'${nameParent}${node.nameProperty}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
    unchanged: () => null,
  };
  return astIter.map(node => plainToRenderType[node.typeProperty](node, nameParentAst));
};

const plainTextRender = ast => `${_.flattenDeep(iterPlain(ast, ''))
  .filter(propertyPlain => propertyPlain)
  .map(propertyPlain => `Property ${propertyPlain}`)
  .join('\n')}\n`;

export default plainTextRender;

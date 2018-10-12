import _ from 'lodash';

const stringifyPlain = (data) => {
  if (_.isPlainObject(data)) return '[complex value]';
  if (typeof data === 'string') return `'${data}'`;
  return data;
};

const iterPlain = (astIter, nameParentAst) => {
  const plainToRenderType = {
    added: (node, nameParent) => `'${nameParent}${node.nameProperty} was added wish value: ${stringifyPlain(node.newValue)}`,
    deleted: (node, nameParent) => `'${nameParent}${node.nameProperty}' was removed`,
    nested: (node, nameParent) => iterPlain(node.children, `${nameParent}${node.nameProperty}.`),
    changed: (node, nameParent) => `'${nameParent}${node.nameProperty}' was updated. From ${stringifyPlain(node.oldValue)} to ${stringifyPlain(node.newValue)}`,
    unchanged: () => 'not changed',
  };
  return astIter.map(node => plainToRenderType[node.typeProperty](node, nameParentAst));
};

const plainTextRender = ast => `${_.flattenDeep(iterPlain(ast, ''))
  .filter(propertyPlain => propertyPlain !== 'not changed')
  .map(propertyPlain => `Property ${propertyPlain}`)
  .join('\n')}\n`;

export default plainTextRender;

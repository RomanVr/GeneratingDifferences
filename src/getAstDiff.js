import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const keys = _.union(_.keys(beforeObj), _.keys(afterObj));
  const reducer = (acc, key) => {
    if (_.has(beforeObj, key) && !_.has(afterObj, key)) return [...acc, { nameProperty: key, statusProperty: 'deleted', dataProperty: beforeObj[key] }];
    if (!_.has(beforeObj, key) && _.has(afterObj, key)) return [...acc, { nameProperty: key, statusProperty: 'added', dataProperty: afterObj[key] }];
    if (_.isPlainObject(beforeObj[key]) && _.isPlainObject(afterObj[key])) return [...acc, { nameProperty: key, statusProperty: 'unchanged', dataProperty: getAstDiff(beforeObj[key], afterObj[key], []) }];
    if (beforeObj[key] === afterObj[key]) return [...acc, { nameProperty: key, statusProperty: 'unchanged', dataProperty: beforeObj[key] }];
    return [...acc, {
      nameProperty: key, statusProperty: 'changed', beforeProperty: beforeObj[key], afterProperty: afterObj[key],
    }];
  };
  return keys.reduce(reducer, []);
};

export default getAstDiff;
